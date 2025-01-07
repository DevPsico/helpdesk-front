import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup; // Formulário Reativo

  constructor(
    private fb: FormBuilder, 
    private toast: ToastrService, 
    private service: AuthService
  ) {}

  ngOnInit(): void {
    // Inicializa o FormGroup com os campos e suas validações
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de email
      senha: ['', [Validators.required, Validators.minLength(3)]] // Campo de senha
    });
  }

  logar(): void {
    if (this.form.invalid) {
      this.toast.error('Preencha os campos corretamente!');
      return;
    }

    const credenciais = this.form.value; // Obtém os valores do formulário
    this.service.authenticate(credenciais).subscribe(
      resposta => {
        this.toast.info(resposta.headers.get('Authorization') || 'Autenticação bem-sucedida!');
      },
      erro => {
        this.toast.error('Erro ao autenticar. Verifique suas credenciais.');
      }
    );
  }

  validaCampos(): boolean {
    return this.form.valid; // Verifica se o formulário inteiro é válido
  }
}
