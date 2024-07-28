import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DictionaryService } from '../../services/dictionary.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [ArticleService, DictionaryService],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.scss'
})
export class ArticleEditComponent implements OnInit {
  article!: app.models.ArticleModel;
  articleForm!: FormGroup;
  categories: app.models.DictionaryModel[] = [];
  statuses: app.models.DictionaryModel[] = [];
  
  constructor(
    private articleService: ArticleService,
    private dictionaryService: DictionaryService,
    private location: Location, 
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.getArticleDetails(articleId);
    }

    this.articleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      articleCode: ['', [Validators.required]],
      description: [''],
      publishDate: ['', [Validators.required]],
      articleCategoryId: ['', [Validators.required]],
      articleStatusId: ['', [Validators.required]],
    });

    this.getCategories();
    this.getStatuses();
  }

  onSubmit(): void {
    if (!this.articleForm.valid) {
      console.log('Form Invalid');
      this.articleForm.markAllAsTouched(); 
      this.articleForm.markAsDirty();
      return;
    }
    if (this.articleForm.valid) {
      const article: app.models.ArticleSaveModel = {
        articleId: this.article.articleId,
        articleCategoryId: this.articleForm.get('articleCategoryId')?.value,
        articleCode: this.articleForm.get('articleCode')?.value,
        articleStatusId: this.articleForm.get('articleStatusId')?.value,
        name: this.articleForm.get('name')?.value,
        description: this.articleForm.get('description')?.value,
        publishDate: this.articleForm.get('publishDate')?.value,
      };
      
      this.articleService.updateArticle(article).subscribe(
        (result: any) => {
          if (result.event === 'ARTICLE_UPDATED') {
            alert('Article updated successfully'); 
            this.onBack();
          }
        },
        (error: any) => {
          alert('Error on updating article, check console');
          console.log(error);
        }
      );
    }
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

  onBack(): void {
    this.location.back(); 
  }

  getArticleDetails(articleId: string): void { 
    this.articleService.getArticleDetails(articleId).subscribe(
      (result: app.models.ArticleModel) => {
        this.article = result;
        this.articleForm.patchValue(result);
      },
      (error: any) => {
        console.error('Error fetching article details', error);
      })
  }
}
