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
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./editar-aluno/editar-aluno.component').then(m => m.EditarAlunoComponent),
    data: {
      title: 'Editar Aluno'
    }
  },
  {
    path: 'turma/:turmaId',
    loadComponent: () => import('./listar-alunos-turma/listar-alunos-turma.component').then(m => m.ListarAlunosTurmaComponent),
    data: {
      title: 'Alunos da Turma'
    }
  }
];