import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  showAlert: boolean = false;
  textAlert: string = '';
  colorAlert: string = '';
  isRegister: boolean = false;


  profileForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  registerProfileForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  async login() {

    const data = {
      email: this.profileForm.value.email ?? '',
      password: this.profileForm.value.password ?? '',
    };

    this.authService.login(data).subscribe(
      (response) => {
        localStorage.setItem('JWT', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/posts']);
      },
      (error) => {
        console.error(error);
        this.displayAlert(error.error.message, 'red');
      },
      () => {
        this.profileForm.reset();
      }
    );
  }

  displayAlert(text: string, color: string) {
    this.showAlert = true;
    this.textAlert = text;
    this.colorAlert = color;
    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }

  register(){
    const data = {
      fullName: this.registerProfileForm.value.fullName ?? '',
      age: Number(this.registerProfileForm.value.age ?? ''),
      email: this.registerProfileForm.value.email ?? '',
      password: this.registerProfileForm.value.password ?? '',
    };

    this.authService.register(data).subscribe(
      (response) => {
        this.displayAlert('Creado con exito!', 'green');
        this.isRegister = false;
      },
      (error) => {
        console.error(error);
        this.displayAlert(error.error.message, 'red');
      },
      () => {
        this.registerProfileForm.reset();
      }
    );
  }

}
