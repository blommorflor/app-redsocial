import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostEditCreateComponent } from '../post-edit-create/post-edit-create.component';
import { PostService } from '../../services/posts.service';
import { Post } from '../../interfaces/posts.interface';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink, PostEditCreateComponent, DatePipe, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  constructor(private postService: PostService) {}

  displayModal: boolean = false;
  posts: Post[] = [];
  userId: number = Number(JSON.parse(localStorage.getItem('user') ?? 'null')?.userId);
  isEditPost: boolean = false;
  postSelected: Post|null = null;
  filter: string = '';

  createNewPost() {
    this.displayModal = true;
  }

  closeModalPost() {
    this.isEditPost = false;
    this.postSelected = null;
    this.getAllPosts();
    this.displayModal = false;
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  async getAllPosts() {
    this.postService.getPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterPosts() {
    return this.posts.filter(post =>
      post.title.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  async deletePost(postId: number){
    this.postService.deletePost(postId).subscribe(
      (response) => {
        this.getAllPosts();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editPost(post: Post){
    this.postSelected = post;
    this.isEditPost = true;
    this.displayModal = true;
  }

  likePost(id: number){
    this.postService.likePost(id).subscribe(
      (response) => {
        let post = this.posts.find(p => p.id == id);

        if (post) {
          post.likes = (post.likes || 0) + 1;
        } else {
          console.error('Post not found');
        }

      },
      (error) => {
        console.error(error);
      }
    );
  }
}
