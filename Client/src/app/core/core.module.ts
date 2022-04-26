import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { AppRoutingModule } from '../pages/app-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
    declarations: [
        LayoutComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        LayoutComponent,
        NotFoundComponent
    ]
})
export class CoreModule { }
