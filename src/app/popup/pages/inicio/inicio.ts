import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'popup-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inicio { }
