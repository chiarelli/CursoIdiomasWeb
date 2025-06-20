import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PopoverDirective } from '@coreui/angular';
import { AlunoResponse, AlunoResponseNull } from 'src/app/dtos/aluno-response';
import { PaginatedResponse } from 'src/app/dtos/pagination-response';
import { Turma } from 'src/app/dtos/turma';
import { TurmasService } from 'src/app/services/turmas.service';
import { environment as env } from 'src/environments/environment';
import { PaginateComponent } from "../paginate/paginate.component";
import { PaginatedResponseNull } from './../../dtos/pagination-response';
import { SecretariaService } from './../../services/secretaria.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-matricular-aluno',
  imports: [
    CommonModule,
    PaginateComponent,
    PopoverDirective
  ],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, height: '0px', overflow: 'hidden', padding: '0' })),
      transition('visible => hidden', [
        animate(`${env.animationDeleteItemTime}ms ease-out`)
      ])
    ])
  ],
  templateUrl: './matricular-aluno.component.html',
  styleUrl: './matricular-aluno.component.scss'
})
export class MatricularAlunoComponent implements OnChanges {

  @Input() turmasMatriculado: Turma[] = [];
  @Input() aluno: AlunoResponse = new AlunoResponseNull();

  @Output() feedback = new EventEmitter<ResultadoMatricula>();

  turmasDisponiveis: PaginatedResponse<Turma> = new PaginatedResponseNull();
  turmasDisponiveisIds: Set<string> = new Set();
  turma?: Turma;

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
        self.turmasDisponiveisIds.add(tuma.id);

        setTimeout(() => {
          self.turmasDisponiveisIds.delete(tuma.id);
          self.feedback.emit(ResultadoMatricula.sucesso(tuma, self.aluno));
        }, env.animationDeleteItemTime);

      },
      error(err) {
        self.feedback.emit(ResultadoMatricula.falha(err));
        console.error('Erro ao matricular aluno', err);
      }
    })
  }

  async carregarTurmasDisponiveis(page: number = this.turmasDisponiveis.page, size: number = this.turmasDisponiveis.size): Promise<PaginatedResponse<Turma>> {
    if(page !== 1 && this.turmasDisponiveis.length == 1) {
      page--;
    }
    
    const turmasMatriculadasIds = this.turmasMatriculado.map(turma => turma.id);
    const self = this;

    return new Promise<PaginatedResponse<Turma>>((resolve, reject) => {

      self.turmasService.listarTurmas(page, size).subscribe({
        next: (res) => {
          const turmasPage = res as PaginatedResponse<Turma>;
  
          const turmasNaoMatriculadas = turmasPage.content.filter(turma =>
            !turmasMatriculadasIds.includes(turma.id)
          );
  
          const turmasDisponiveis = new PaginatedResponse<Turma>(
            turmasPage.page,
            turmasPage.size,
            turmasNaoMatriculadas.length,
            turmasPage.total_query_count - turmasMatriculadasIds.length,
            turmasPage.total_pages,
            turmasNaoMatriculadas
          );

          if(turmasDisponiveis.content.length !== 0) {
            self.turmasDisponiveis = turmasDisponiveis;
          } else {
            self.turmasDisponiveis.total_pages--;
            self.turmasDisponiveis.page--;
          }

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

  getState(id: string): 'visible' | 'hidden' {
    return this.turmasDisponiveisIds.has(id) ? 'hidden' : 'visible';
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
