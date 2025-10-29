import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// Declare the Chrome Extensions API global to satisfy TypeScript
declare const chrome: any;
@Component({
  selector: 'popup-png',
  imports: [],
  templateUrl: './png.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Png {}
