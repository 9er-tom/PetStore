import {enableProdMode} from '@angular/core';
import {ApplicationRef} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {devTools} from '@ngneat/elf-devtools';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule).then((moduleRef) => {
  devTools({
    postTimelineUpdate: () => moduleRef.injector.get(ApplicationRef).tick()
  })
}).catch(err => console.error(err));
