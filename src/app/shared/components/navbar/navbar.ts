import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavigationItem {
  label: string;
  route: string;
  active?: boolean;
}

interface User {
  name: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  navigationItems: NavigationItem[] = [
    {
      label: 'Catalog',
      route: '/catalog'
    },
    {
      label: 'Circulation',
      route: '/circulation',
      active: true
    },
    {
      label: 'Reports',
      route: '/reports'
    }
  ];

  user: User = {
    name: 'Librarian',
    avatarUrl: 'https://i.pravatar.cc/300'
  }

}
