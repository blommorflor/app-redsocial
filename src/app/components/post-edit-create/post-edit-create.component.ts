import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../services/posts.service';
import { Post } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-post-edit-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-edit-create.component.html',
  styleUrl: './post-edit-create.component.css',
})
export class PostEditCreateComponent implements OnChanges {
  constructor(private postService: PostService) {}

  @Input() displayModal: boolean = false;
  @Input() dataPost: Post | null = null;
  @Input() isEdit: boolean = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEdit) {
      this.postForm.patchValue({
        title: this.dataPost?.title || '',
        content: this.dataPost?.content || '',
      });
    }
  }

  cerrar() {
    this.postForm.reset();
    this.closeModalEvent.emit(false);
  }

  createPost() {
    const userData = JSON.parse(localStorage.getItem('user') ?? 'null');

    const data = {
      title: this.postForm.value.title ?? '',
      content: this.postForm.value.content ?? '',
      userId: userData.userId,
    };

    this.postService.createPost(data).subscribe(
      (response) => {
        this.cerrar();
      },
      (error) => {}
    );
  }

  updatePost() {
    const userData = JSON.parse(localStorage.getItem('user') ?? 'null');

    const data = {
      title: this.postForm.value.title ?? '',
      content: this.postForm.value.content ?? '',
    };

    this.postService.updatePost(this.dataPost?.id ?? 0, data).subscribe(
      (response) => {
        this.cerrar();
      },
      (error) => {}
    );
  }
}
