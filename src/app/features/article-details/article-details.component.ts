import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DictionaryService } from '../../services/dictionary.service';


@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  providers: [ArticleService],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent implements OnInit {
  article!: app.models.ArticleModel;

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.getArticleDetails(articleId);
    }
  }

  getArticleDetails(articleId: string): void { 
    this.articleService.getArticleDetails(articleId).subscribe(
      (result: app.models.ArticleModel) => {
        this.article = result;
      },
      (error: any) => {
        console.error('Error fetching article details', error);
      })
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }

  editArticle(articleId: string): void {
    this.router.navigate(['/article-edit', articleId]);
  }

  deleteArticle(): void {
    this.articleService.deleteArticle(this.article.articleId).subscribe(result=> { 
      if (result.event === 'ARTICLE_DELETED') {
        alert('Article deleted successfully'); 
        this.goBack();
      }
    },
    (error: any) => {
      alert('Error on deleting article, check console');
      console.log(error);
    })
  }
}
