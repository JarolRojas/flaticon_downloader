import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-popup',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './popup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popup { }
