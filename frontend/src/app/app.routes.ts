import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full'
    },
    {
        path: 'dashboard', 
            loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard')
                .then(m => m.Dashboard),
    }
];