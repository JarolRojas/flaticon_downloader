import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { popupRoutes } from './app/popup/popup.routes';
import { Popup } from './app/popup/popup';


bootstrapApplication(Popup, {
  providers: [provideRouter(popupRoutes)]
});
