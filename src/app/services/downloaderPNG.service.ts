import { Injectable } from '@angular/core';
import { ChromeMessagingService } from './chrome-messaging.service';
import { BehaviorSubject } from 'rxjs';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class DownloaderPNG {

  private pngs = new BehaviorSubject<String[]>([]);

  // Progress subject: { total, downloaded, errors, percent, currentFile, zipPercent }
  public progress$ = new BehaviorSubject<any>({ total: 0, downloaded: 0, errors: 0, percent: 0, currentFile: '', zipPercent: 0 });
  private pages: String[] = [];
  private AJAX_PNG_URL?: string;
  private AJAX_PNG_PAGINTATION: number = 1;

  constructor(private chromeSvc: ChromeMessagingService) {
    this.chromeSvc.getLinkAjaxPng().then(url => {
      this.AJAX_PNG_URL = url;
    });
    this.chromeSvc.getPaginationTotal().then(total => {
      this.AJAX_PNG_PAGINTATION = total;
    });
  }

  async downloadAllAsZip(): Promise<Blob> {
    try {
      // Asegurar que tenemos URL y paginación
      if (!this.AJAX_PNG_URL) {
        this.AJAX_PNG_URL = await this.chromeSvc.getLinkAjaxPng();
      }
      if (!this.AJAX_PNG_PAGINTATION || this.AJAX_PNG_PAGINTATION < 1) {
        this.AJAX_PNG_PAGINTATION = await this.chromeSvc.getPaginationTotal();
      }

      let JSZip: any = (window as any).JSZip;
      JSZip = require('../libs/jszip.min.js');
      const zip = new JSZip();



      // Recolectar todos los items (name + src)
      const items: Array<{ name: string; src: string; id?: number }> = [];
      for (let p = 1; p <= this.AJAX_PNG_PAGINTATION; p++) {
        const pageUrl = this.AJAX_PNG_URL + '/' + p;
        try {
          const res = await fetch(pageUrl);
          if (!res.ok) continue;
          const data = await res.json();
          if (Array.isArray(data.items)) {
            for (const it of data.items) items.push({ name: it.name || 'icon', src: it.src });
          }
        } catch (e) {
          console.warn('Error cargando página', pageUrl, e);
        }
      }

      // Si no hay items, salir
      if (!items.length) throw new Error('No se encontraron iconos para descargar.');



      // Helper: sanitizar nombre de archivo
      const sanitize = (s: string) => s.replace(" ", '_').trim() || 'icon';







      // Descargar imágenes con concurrencia limitada
      const concurrency = 5; //descargas en paralelo

      let index = 0;
      const self = this;

      // Map para contar ocurrencias de nombres y evitar colisiones en el ZIP
      const nameCounts = new Map<string, number>();

      // inicializar progreso
      this.progress$.next({ total: items.length, downloaded: 0, errors: 0, percent: 0, currentFile: '', zipPercent: 0 });
      async function worker() {
        while (index < items.length) {
          const i = index++;
          const item = items[i];

          try {
            const r = await fetch(item.src, { mode: 'cors' });

            if (!r.ok) {
              // incrementar errores
              try { (self as any).progress$.next({ ...((self as any).progress$.value), errors: ((self as any).progress$.value.errors || 0) + 1 }); } catch (e) { }
              continue;
            }

            const blob = await r.blob();

            const baseName = sanitize(item.name);
            const prev = nameCounts.get(baseName) || 0;
            const occurrence = prev + 1;
            nameCounts.set(baseName, occurrence);
            const suffix = occurrence > 1 ? `_${occurrence}` : '';

            const filename = `${baseName}${suffix}.png`;

            zip.file(filename, blob);



            // actualizar progreso
            try {
              const cur = (self as any).progress$.value || { total: items.length, downloaded: 0, errors: 0 };
              const downloaded = (cur.downloaded || 0) + 1;
              const percent = Math.round((downloaded / items.length) * 100);
              (self as any).progress$.next({ ...cur, downloaded, percent, currentFile: filename });
            } catch (e) { }


          } catch (e) {
            console.warn('Error descargando', item.src, e);
            try { (self as any).progress$.next({ ...((self as any).progress$.value), errors: ((self as any).progress$.value.errors || 0) + 1 }); } catch (e) { }
          }
        }
      }

      // lanzar workers
      const workers = [];
      for (let w = 0; w < concurrency; w++) workers.push(worker());
      await Promise.all(workers);

      // Generar ZIP
      // Generar ZIP con callback para informar progreso de zip
      const zipBlob = await zip.generateAsync({ type: 'blob' }, (meta: any) => {
        try {
          const cur = this.progress$.value || {};
          this.progress$.next({ ...cur, zipPercent: meta.percent || 0 });
        } catch (e) { }
      });

      // asegurar que el zipPercent llega a 100 al finalizar
      try { const cur = this.progress$.value || {}; this.progress$.next({ ...cur, zipPercent: 100 }); } catch (e) { }

      // Devolver el blob al llamador para que decida el nombre y haga la descarga
      return zipBlob;

    } catch (err) {
      console.error('downloadAllAsZip error', err);
      throw err;
    }
  }


}
