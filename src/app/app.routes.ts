import { Routes } from '@angular/router';

export const routes: Routes = [
        {
        path: '',
        loadComponent: () => import('./shared/layout/app-layout/views/app-layout/app-layout.component'),
        children: [

        ]
    },
];
