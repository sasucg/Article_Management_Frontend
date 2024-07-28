import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DictionaryService } from '../../services/dictionary.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  providers: [ArticleService, DictionaryService],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit {
  articles: app.models.ArticleModel[] = [];
  filters = {
    name: '',
    code: '',
    category: '',
    status: '',
    startDate: '',
    endDate: ''
  };
  categories: app.models.DictionaryModel[] = [];
  statuses: app.models.DictionaryModel[] = [];
  private filterSubject: Subject<any> = new Subject();
  
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private dictionaryService: DictionaryService,
  ) { 
    
  }

  ngOnInit(): void {
    this.getCategories();
    this.getStatuses();
    this.getArticleByFilters();
    this.filterSubject.pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.getArticleByFilters();
    });
  }

  getArticleByFilters() {
    this.articleService.getArticleListByFilters(this.filters).subscribe(result=> { 
      this.articles = result;
    })
  }
  onFilterChange(): void {
    this.filterSubject.next(this.filters);
  }

  getCategories() {
    this.dictionaryService.getCategories().subscribe(result=> { 
      this.categories = result;
    })
  }

  getStatuses() {
    this.dictionaryService.getStatuses().subscribe(result=> { 
      this.statuses = result;
    })
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  resetFilters(): void { 
    this.filters = {
      name: '',
      code: '',
      category: '',
      status: '',
      startDate: '',
      endDate: ''
    };
    this.getArticleByFilters();
  }

  viewArticle(articleId: string): void {
    this.router.navigate(['/articles', articleId]);
  }

  editArticle(articleId: string): void {
    this.router.navigate(['/article-edit', articleId]);
  }

  deleteArticle(articleId: string): void {
    this.articleService.deleteArticle(articleId).subscribe(result=> { 
      if (result.event === 'ARTICLE_DELETED') {
        alert('Article deleted successfully'); 
        this.articles = this.articles.filter(a => a.articleId !== articleId);
      }
    },
    (error: any) => {
      alert('Error on deleting article, check console');
      console.log(error);
    })
  }
}
