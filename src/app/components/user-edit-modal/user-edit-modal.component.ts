import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLogin } from '../../interfaces/userlogin.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-edit-modal.component.html',
  styleUrl: './user-edit-modal.component.css'
})
export class UserEditModalComponent implements OnChanges{

  constructor(
    private userService: UserService
  ){}

  @Input() displayModal: boolean = false;
  @Input() userData: UserLogin|null = null;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  userForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(1, [Validators.required, Validators.min(1)]),
    password: new FormControl(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
    this.userForm.patchValue({
      fullName: this.userData?.fullName || '',
      email: this.userData?.email || '',
      age: this.userData?.age || 0,
      password: '',
    });
  }

  cerrar() {
    this.closeModalEvent.emit(false);
  }

  updateUser(){

    const data = {
      fullName: this.userForm.value?.fullName ?? '',
      email: this.userForm.value?.email ?? '',
      age: this.userForm.value?.age ?? 0,
      password: this.userForm.value?.password ?? '',
    }

    this.userService.updateUser(this.userData?.userId ?? 0, data).subscribe(
      (response) => {
        localStorage.setItem('user', JSON.stringify({
          userId: this.userData?.userId,
          fullName: this.userForm.value?.fullName ?? '',
          email: this.userForm.value?.email ?? '',
          age: this.userForm.value?.age ?? 0,
        }))

        this.cerrar();
      },
      (error) => {
        console.log(error);

      }
    )

  }

}
