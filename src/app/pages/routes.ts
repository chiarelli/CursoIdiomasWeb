import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listagem',
    loadComponent: () => import('./listar-alunos/listar-alunos.component').then(m => m.ListarAlunosComponent),
    data: {
      title: 'Listagem de Alunos'
    }
  },
  {
    path: 'cadastrar',
    loadComponent: () => import('./cadastrar-aluno/cadastrar-aluno.component').then(m => m.CadastrarAlunoComponent),
    data: {
      title: 'Cadastro de Alunos'
    }
  }
];