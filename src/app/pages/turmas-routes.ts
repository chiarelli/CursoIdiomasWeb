import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listagem',
    loadComponent: () => import('./listar-turmas/listar-turmas.component').then(m => m.ListarTurmasComponent)
  },
  {
    path: 'cadastrar',
    loadComponent: () => import('./cadastrar-turma/cadastrar-turma.component').then(m => m.CadastrarTurmaComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./editar-turma/editar-turma.component').then(m => m.EditarTurmaComponent)
  }
];