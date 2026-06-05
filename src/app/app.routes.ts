import { Routes } from '@angular/router';
import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { AvailableBooksPage } from './features/books/pages/available-books-page/available-books-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'available-books',
        component: AvailableBooksPage
      }
    ]
  }
];
