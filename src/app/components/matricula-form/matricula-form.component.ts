import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  confirmPasswordValidator,
  phonesValidator,
} from '../../validators/confirmPassword.validator';
import { TelefoneMaskDirective } from '../../directives/telefone-mask.directive';

interface FormularioEnviado {
  nomeCompleto: string;
  email: string;
  telefones: string[];
  idade: number;
  senha: string;
  genero: string;
  cidade: string;
  aceitaTermos: boolean;
}

@Component({
  selector: 'app-matricula-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TelefoneMaskDirective],
  templateUrl: './matricula-form.component.html',
  styleUrl: './matricula-form.component.css',
})
export class MatriculaFormComponent implements OnInit {
  formulario: FormGroup;
  formularioEnviado: FormularioEnviado | null = null;
  cidades = ['Colatina', 'Marilândia', 'Linhares', 'Vitória', 'Serra', 'Outra'];

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({});
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.formulario = this.fb.group(
      {
        nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        telefones: this.fb.array([this.criarControleTelefone()], phonesValidator()),
        idade: ['', [Validators.required, Validators.min(18)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        genero: ['', Validators.required],
        cidade: ['', Validators.required],
        aceitaTermos: [false, Validators.requiredTrue],
      },
      {
        validators: confirmPasswordValidator(),
      },
    );
  }

  private criarControleTelefone(): FormGroup {
    return this.fb.group({
      telefone: ['', [Validators.required, this.telefoneLengthValidator()]],
    });
  }

  private telefoneLengthValidator() {
    return (control: any): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const numeros = control.value.replace(/\D/g, '');
      if (numeros.length < 11) {
        return { invalidPhone: true };
      }
      return null;
    };
  }

  get telefones(): FormArray {
    return this.formulario.get('telefones') as FormArray;
  }

  get nomeCompleto() {
    return this.formulario.get('nomeCompleto');
  }

  get email() {
    return this.formulario.get('email');
  }

  get idade() {
    return this.formulario.get('idade');
  }

  get password() {
    return this.formulario.get('password');
  }

  get confirmPassword() {
    return this.formulario.get('confirmPassword');
  }

  get genero() {
    return this.formulario.get('genero');
  }

  get cidade() {
    return this.formulario.get('cidade');
  }

  get aceitaTermos() {
    return this.formulario.get('aceitaTermos');
  }

  adicionarTelefone(): void {
    this.telefones.push(this.criarControleTelefone());
  }

  removerTelefone(index: number): void {
    if (this.telefones.length > 1) {
      this.telefones.removeAt(index);
    }
  }

  obterMensagemErroNome(): string {
    if (this.nomeCompleto?.hasError('required')) {
      return 'O nome está inválido';
    }
    if (this.nomeCompleto?.hasError('minlength')) {
      return 'O nome está inválido';
    }
    return '';
  }

  obterMensagemErroEmail(): string {
    if (this.email?.hasError('required')) {
      return 'O e-mail está inválido';
    }
    if (this.email?.hasError('email')) {
      return 'O e-mail está inválido';
    }
    return '';
  }

  obterMensagemErroIdade(): string {
    if (this.idade?.hasError('required')) {
      return 'A idade é obrigatória';
    }
    if (this.idade?.hasError('min')) {
      return 'A idade mínima é 18 anos';
    }
    return '';
  }

  obterMensagemErroSenha(): string {
    if (this.password?.hasError('required')) {
      return 'A senha é obrigatória';
    }
    if (this.password?.hasError('minlength')) {
      return 'A senha deve ter no mínimo 6 caracteres';
    }
    return '';
  }

  obterMensagemErroConfirmarSenha(): string {
    if (this.confirmPassword?.hasError('required')) {
      return 'A confirmação de senha é obrigatória';
    }
    if (this.formulario.hasError('confirmPasswordMismatch')) {
      return 'As senhas não coincidem';
    }
    return '';
  }

  enviarFormulario(): void {
    if (this.formulario.valid) {
      const valores = this.formulario.value;
      this.formularioEnviado = {
        nomeCompleto: valores.nomeCompleto,
        email: valores.email,
        telefones: valores.telefones.map((t: any) => t.telefone),
        idade: valores.idade,
        senha: valores.password,
        genero: valores.genero,
        cidade: valores.cidade,
        aceitaTermos: valores.aceitaTermos,
      };
    }
  }

  limparFormulario(): void {
    this.formulario.reset();
    this.formularioEnviado = null;
    this.telefones.clear();
    this.telefones.push(this.criarControleTelefone());
  }
}
