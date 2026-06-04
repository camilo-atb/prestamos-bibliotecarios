import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [ RouterLink ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Available Books',
      icon: 'book',
      route: '/books',
      active: true
    },
    {
      label: 'Create Loan',
      icon: 'add_shopping_cart',
      route: '/loans/create'
    },
    {
      label: 'User Loans',
      icon: 'group',
      route: '/loans/user'
    },
    {
      label: 'Return Loan',
      icon: 'assignment_return',
      route: '/loans/return'
    }
  ];

}
