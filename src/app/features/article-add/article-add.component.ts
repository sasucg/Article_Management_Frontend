import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-article-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [ArticleService, DictionaryService],
  templateUrl: './article-add.component.html',
  styleUrl: './article-add.component.scss'
})
export class ArticleAddComponent implements OnInit {
  articleForm!: FormGroup;
  categories: app.models.DictionaryModel[] = [];
  statuses: app.models.DictionaryModel[] = [];
  
  constructor(
    private articleService: ArticleService,
    private dictionaryService: DictionaryService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      articleCode: ['', [Validators.required]],
      description: [''],
      publishDate: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
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
        articleId: undefined,
        articleCategoryId: this.articleForm.get('categoryId')?.value,
        articleCode: this.articleForm.get('articleCode')?.value,
        articleStatusId: this.articleForm.get('statusId')?.value,
        name: this.articleForm.get('name')?.value,
        description: this.articleForm.get('description')?.value,
        publishDate: this.articleForm.get('publishDate')?.value,
      };
    
      this.articleService.saveArticle(article).subscribe(
        (result: any) => {
          if (result.event === 'ARTICLE_SAVED') {
            alert('Article saved successfully'); 
            this.clearArticle();
          }
          if (result.event === 'ARTICLE_EXISTING_CODE_SAVED_FAILED') {
            alert('Article code existing');
          }
        },
        (error: any) => {
          alert('Error on saving article, check console');
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

  clearArticle() { 
    this.articleForm.reset({
      categoryId: '', 
      name: '',       
      description: '', 
      publishDate: '', 
      articleStatusId: '', 
      articleCode: ''  
    });
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }
}
