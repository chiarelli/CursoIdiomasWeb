import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'listagem',
    loadComponent: () => import('./listar-turmas/listar-turmas.component').then(m => m.ListarTurmasComponent),
    data: {
      title: 'Listagem de Turmas'
    }
  },
  {
    path: 'cadastrar',
    loadComponent: () => import('./cadastrar-turma/cadastrar-turma.component').then(m => m.CadastrarTurmaComponent),
    data: {
      title: 'Cadastrar Turma'
    }
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./editar-turma/editar-turma.component').then(m => m.EditarTurmaComponent),
    data: {
      title: 'Editar Turma'
    }
  },
  {
    path: 'aluno/:aluno_id/matriculado',
    loadComponent: () => import('./listar-turmas-aluno-matriculado/listar-turmas-aluno-matriculado.component').then(m => m.ListarTurmasAlunoMatriculadoComponent),
    data: {
      title: 'Turmas Matriculadas'
    }
  }
];