import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ChromeMessagingService } from '../services/chrome-messaging.service';

// Declare the Chrome Extensions API global to satisfy TypeScript
declare const chrome: any;

@Component({
  selector: 'app-popup',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './popup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popup {

  // Valor detectado del total de iconos (si aplica)
  paginationTotal: number | null = null;
  // Valor detectado del número de páginas (si aplica)
  paginationPages: number | null = null;
  // Última respuesta cruda del content script (útil para debug)
  lastResponse: any = null;
  // Primer data-pack_id encontrado dentro de un elemento con clase 'search-result'
  firstSearchResultPackId: string | null = null;

  titlePack: string | null = null;

  constructor(private cdr: ChangeDetectorRef, private chromeSvc: ChromeMessagingService) { }

  async ngOnInit(): Promise<void> {
    // Pedir ambos datos automáticamente al abrir el popup usando el servicio
    const pagintationTotal = await this.chromeSvc.getPaginationTotal();
    const packId = await this.chromeSvc.getFirstPackId();


    // Guardar en propiedades para posible uso posterior
    this.paginationTotal = pagintationTotal;
    this.firstSearchResultPackId = packId;

    // Forzar detección (OnPush)
    try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
  }

}
