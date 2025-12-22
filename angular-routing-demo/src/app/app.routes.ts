import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { PostsComponent } from './posts/posts';
import { PostDetailsComponent } from './post-details/post-details';
import { NotFoundComponent } from './not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailsComponent },
  { path: '**', component: NotFoundComponent },
];
