import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listagem',
    loadComponent: () => import('./listar-turmas/listar-turmas.component').then(m => m.ListarTurmasComponent)
  }
];