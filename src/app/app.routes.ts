import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { PostsComponent } from './components/posts/posts.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "posts", // Redirige la ruta vacía a "/posts"
    pathMatch: "full" // Asegura que solo se redirija cuando la ruta es exactamente igual a ""
  },
  {
    path: "posts",
    component: PrincipalComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Posts',
        component: PostsComponent,
      },
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  { path: '**', component: NotFoundComponent }
];

