import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ArticleListComponent } from './features/article-list/article-list.component';
import { ArticleAddComponent } from './features/article-add/article-add.component';
import { ArticleDetailsComponent } from './features/article-details/article-details.component';
import { ArticleEditComponent } from './features/article-edit/article-edit.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'articles', component: ArticleListComponent},
  {path: 'article-add', component: ArticleAddComponent},
  {path: 'article-edit/:id', component: ArticleEditComponent},
  {path: 'articles/:id', component: ArticleDetailsComponent },
  {path: '**', redirectTo: '/home', pathMatch: 'full' },
];