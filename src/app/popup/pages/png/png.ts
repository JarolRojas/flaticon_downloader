import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ChromeMessagingService } from '../../../services/chrome-messaging.service';
import { DownloaderPNG } from '../../../services/downloaderPNG.service';
import { Subscription } from 'rxjs';

declare const chrome: any;
@Component({
  selector: 'popup-png',
  imports: [],
  templateUrl: './png.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Png implements OnInit, OnDestroy {
  ocultarBoton?: boolean;
  ocultarDescargando?: boolean;
  ocultarStats?: boolean;

  link: string | null = null;

  zipName: string = 'flaticon-pack.zip';
  showNamePicker: boolean = false;

  totalIcons = 0;
  downloadedIcons = 0;
  erroredIcons = 0;
  elapsedTime = '0 ms';
  totalSize = '0 KB';
  currentFile = '';
  percent = 0;
  zipPercent = 0;

  private progressSub?: Subscription;
  private zipBlob?: Blob;

  constructor(private chromeSvc: ChromeMessagingService, private downloader: DownloaderPNG, private cdr: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    if (this.progressSub) this.progressSub.unsubscribe();
  }

  async ngOnInit() {
    // Resetear todas las estadísticas
    this.totalIcons = 0;
    this.downloadedIcons = 0;
    this.erroredIcons = 0;
    this.elapsedTime = '0 ms';
    this.totalSize = '0 KB';
    this.currentFile = '';
    this.percent = 0;
    this.zipPercent = 0;
    this.zipName = await this.chromeSvc.getPackTitle() + '.zip';

    this.ocultarBoton = false;
    this.ocultarDescargando = true;
    this.ocultarStats = true;

    // Resetear el BehaviorSubject del downloader para que no emita valores anteriores
    (this.downloader as any).progress$.next({ total: 0, downloaded: 0, errors: 0, percent: 0, currentFile: '', zipPercent: 0 });

    this.progressSub = this.downloader.progress$.subscribe((p: any) => {
      this.totalIcons = p.total || 0;
      this.downloadedIcons = p.downloaded || 0;
      this.erroredIcons = p.errors || 0;
      this.currentFile = p.currentFile || '';
      this.percent = p.percent || 0;
      this.zipPercent = Math.round(p.zipPercent || 0);
      if (this.totalIcons > 0) this.ocultarStats = false;
      try { this.cdr.detectChanges(); } catch (e) { }
    });
  }

  async downloadPng() {
    try {
      this.ocultarBoton = true;
      this.ocultarDescargando = false;
      this.ocultarStats = true;
      const start = Date.now();

      // Descargar el ZIP
      this.zipBlob = await this.downloader.downloadAllAsZip();

      const elapsed = Date.now() - start;
      this.elapsedTime = this.formatElapsed(elapsed);

      try {
        const size = (this.zipBlob && (this.zipBlob as any).size) || 0;
        this.totalSize = this.formatBytes(size);
      } catch (e) { this.totalSize = '0 KB'; }

      // Mostrar las stats y el selector de nombre
      this.ocultarDescargando = true;
      this.ocultarStats = false;
      this.showNamePicker = true;
      try { this.cdr.detectChanges(); } catch (e) { }
    } catch (e) {
      console.error('Error descargando pack', e);
      this.ocultarBoton = false;
      this.ocultarDescargando = true;
      this.ocultarStats = true;
      this.showNamePicker = false;
      try { this.cdr.detectChanges(); } catch (err) { }
    }
  }

  cancelNamePick() {
    this.showNamePicker = false;
    this.ocultarBoton = false;
    this.ocultarStats = true;
    this.zipBlob = undefined;
    try { this.cdr.detectChanges(); } catch (e) { }
  }

  async confirmAndDownload() {
    try {
      if (!this.zipBlob) throw new Error('No ZIP blob available');

      let filename = (this.zipName && this.zipName.trim()) ? this.zipName.trim() : 'flaticon_pack.zip';

      const a = document.createElement('a');
      const url = URL.createObjectURL(this.zipBlob);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      this.showNamePicker = false;
      this.ocultarBoton = true;
      try { this.cdr.detectChanges(); } catch (e) { }
    } catch (e) {
      console.error('Error al guardar el ZIP', e);
      this.ocultarBoton = false;
      try { this.cdr.detectChanges(); } catch (err) { }
    }
  }

  // ...existing code...
  private formatElapsed(ms: number): string {
    const roundedMs = Math.round(ms);
    if (roundedMs < 1000) return `${roundedMs} ms`;
    return `${(roundedMs / 1000).toFixed(3)} s`;
  }

  private formatBytes(bytes: number): string {
    if (!bytes || bytes === 0) return '0 KB';
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let value = bytes;
    while (value >= 1024 && i < units.length - 1) {
      value = value / 1024;
      i++;
    }
    if (i === 0) return `${value} ${units[i]}`;
    return `${value.toFixed(2)} ${units[i]}`;
  }
}
