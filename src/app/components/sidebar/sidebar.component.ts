import { Component } from '@angular/core';
import { UserLogin } from '../../interfaces/userlogin.interface';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [UserEditModalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  user: UserLogin = JSON.parse(localStorage.getItem('user') ?? 'null');
  displayModal: boolean = false;

  openEditModal(){
    this.displayModal = true;
  }

  closeModal(){
    this.displayModal = false;
    this.user = JSON.parse(localStorage.getItem('user') ?? 'null');

  }
}
