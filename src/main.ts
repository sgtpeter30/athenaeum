import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './athenaeum/app.module';
import { platformBrowser } from '@angular/platform-browser';


platformBrowser().bootstrapModule(AppModule)
  .catch(err => console.error(err));
