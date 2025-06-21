import { NgxSpinnerModule } from 'ngx-spinner';

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions())
    , provideClientHydration()
    ,provideAnimations()
    ,provideHttpClient(withFetch() ,
  withInterceptors([loadingInterceptor]) )
,
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 3000,
        preventDuplicates: true,
        
      }),
      NgxSpinnerModule
    )
    ]
};
