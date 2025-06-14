import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listagem',
    loadComponent: () => import('./listar-alunos/listar-alunos.component').then(m => m.ListarAlunosComponent),
    data: {
      title: 'Listagem de Alunos'
    }
  }
];