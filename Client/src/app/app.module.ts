import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { UsersModule } from './modules/users/users.module';

import { AppComponent } from './app.component';

import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { ForumsService } from './modules/forums/services/forums.service';
import { AuthService } from './modules/users/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    UsersModule
  ],
  providers: [
      AuthService,
      AuthGuardService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,
          multi: true
      },
      ForumsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
