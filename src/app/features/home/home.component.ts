import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private router: Router
  ) { 
  }

  ngOnInit(): void { 
  }

  redirectToArticleListPage(): void {
    this.router.navigate(['/articles']);
  }

  redirectToArticleAddPage(): void {
    this.router.navigate(['/article-add']);
  }
}