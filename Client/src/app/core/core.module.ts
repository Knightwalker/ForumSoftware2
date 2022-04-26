import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from '../app.routing';
import { ForumsModule } from '../modules/forums/forums.module';

@NgModule({
    declarations: [
        LayoutComponent,
        HomeComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        ForumsModule
    ],
    exports: [
        LayoutComponent,
        HomeComponent,
        NotFoundComponent
    ],
})
export class CoreModule { }
