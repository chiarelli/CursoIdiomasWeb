import { SecretariaService } from './../../services/secretaria.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from 'src/app/dtos/pagination-response';
import { Turma } from 'src/app/dtos/turma';
import { TurmasService } from 'src/app/services/turmas.service';
import { PaginateComponent } from "../paginate/paginate.component";
import { PaginatedResponseNull } from './../../dtos/pagination-response';
import { environment as env } from 'src/environments/environment';
import { AlunoResponse, AlunoResponseNull } from 'src/app/dtos/aluno-response';

@Component({
  selector: 'app-matricular-aluno',
  imports: [
    CommonModule,
    PaginateComponent
],
  templateUrl: './matricular-aluno.component.html',
  styleUrl: './matricular-aluno.component.scss'
})
export class MatricularAlunoComponent implements OnChanges {

  @Input() turmasMatriculado: Turma[] = [];
  @Input() aluno: AlunoResponse = new AlunoResponseNull();

  @Output() feedback = new EventEmitter<ResultadoMatricula>();

  turmasDisponiveis: PaginatedResponse<Turma> = new PaginatedResponseNull();

  constructor(
    private turmasService: TurmasService,
    private secretariaService: SecretariaService
  ) {
    this.turmasDisponiveis.size = env.paginationSizeDefault;
  }

  execute(tuma: Turma): void {
    const self = this;
    this.secretariaService.matricularAluno(tuma.id, this.aluno.id).subscribe({
      next(value) {
        self.feedback.emit(ResultadoMatricula.sucesso(tuma, self.aluno));
      },
      error(err) {
        self.feedback.emit(ResultadoMatricula.falha(err));
        console.error('Erro ao matricular aluno', err);
      }
    })
  }

  async carregarTurmasDisponiveis(page: number = this.turmasDisponiveis.page, size: number = this.turmasDisponiveis.size): Promise<PaginatedResponse<Turma>> {
    const turmasMatriculadasIds = this.turmasMatriculado.map(turma => turma.id);
    const self = this;

    console.log('Turmas matriculadas:', self.turmasMatriculado);

    return new Promise<PaginatedResponse<Turma>>((resolve, reject) => {

      self.turmasService.listarTurmas(page, size).subscribe({
        next: (res) => {
          const turmasPage = res as PaginatedResponse<Turma>;
  
          const turmasNaoMatriculadas = turmasPage.content.filter(turma =>
            !turmasMatriculadasIds.includes(turma.id)
          );
  
          self.turmasDisponiveis = new PaginatedResponse<Turma>(
            turmasPage.page,
            turmasPage.size,
            turmasNaoMatriculadas.length,
            turmasPage.total_query_count - turmasMatriculadasIds.length,
            turmasPage.total_pages,
            turmasNaoMatriculadas
          );

          console.log('Turmas carregadas:', self.turmasDisponiveis);

          resolve(self.turmasDisponiveis);
        },
        error: (err) => {
          alert('Erro ao carregar turmas');
          console.error('Erro ao carregar turmas', err);
          reject(err);
        }
      });
      
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['turmasMatriculado']) {
      this.carregarTurmasDisponiveis();
    }
  }

}

export class ResultadoMatricula {
  success: { turma: Turma; aluno: AlunoResponse } | null;
  error: Error | null;

  constructor(
    success: { turma: Turma; aluno: AlunoResponse } | null = null,
    error: Error | null = null
  ) {
    this.success = success;
    this.error = error;
  }

  static sucesso(turma: Turma, aluno: AlunoResponse): ResultadoMatricula {
    return new ResultadoMatricula({ turma, aluno }, null);
  }

  static falha(error: Error): ResultadoMatricula {
    return new ResultadoMatricula(null, error);
  }

  isSuccess(): boolean {
    return this.success !== null;
  }

  isError(): boolean {
    return this.error !== null;
  }
}
