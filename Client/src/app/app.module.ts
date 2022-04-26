import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './pages/app-routing.module';
import { CoreModule } from './core/core.module';
import { ForumsModule } from './modules/forums/forums.module';
import { UsersModule } from './modules/users/users.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { ForumsService } from './modules/forums/services/forums.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    ForumsModule,
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
