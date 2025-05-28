import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/layout/app-layout/views/app-layout/app-layout.component'),
        children: [

        ]
    },

    {
        path: 'prueba',
        loadComponent: () => import('./shared/layout/app-layout/views/app-layout/app-layout.component'),
        children: [
            {
                path: '',
                redirectTo: 'prueba',
                pathMatch: 'full'
            },
            {
                path: 'prueba',
                title: 'componente prueba',
                loadComponent: () => import('./features/views/prueba/prueba.component'),
            },
        ]
    },


];
