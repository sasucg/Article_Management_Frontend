import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';


@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {
  }
  apiUrl: string = 'https://localhost:7038/api/Article';

  getArticleListByFilters(filters: any): Observable<app.models.ArticleModel[]> {
    let params = new HttpParams();
    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.code) {
      params = params.set('code', filters.code);
    }
    if (filters.category) {
      params = params.set('categoryId', filters.category);
    }
    if (filters.status) {
      params = params.set('statusId', filters.status);
    }
    if (filters.startDate) {
      params = params.set('startDate', new Date(filters.startDate).toISOString());
    }
    if (filters.endDate) {
      params = params.set('endDate', new Date(filters.endDate).toISOString());
    }
    return this.http.get<app.models.ArticleModel[]>(`${this.apiUrl}/getArticlesByFilters`, { params })
      .pipe(
        map((response: any) => response)
      );
  }

  getArticleDetails(articleId: string): Observable<app.models.ArticleModel> {
    let params = new HttpParams();
    if (articleId) {
      params = params.set('articleId', articleId);
    }
   
    return this.http.get<app.models.ArticleModel>(`${this.apiUrl}/getArticleDetails`, { params })
      .pipe(
        map((response: any) => response)
      );
  }

  saveArticle(article: app.models.ArticleSaveModel): Observable<any> {
    const url = `${this.apiUrl}/saveArticle`;
    const body = {
      name: article.name,
      articleCode: article.articleCode,
      articleCategoryId: article.articleCategoryId,
      articleStatusId: article.articleStatusId,
      publishDate: article.publishDate,
      description: article.description,
    };
    return this.http.post<any>(url, body);
  }

  updateArticle(article: app.models.ArticleSaveModel): Observable<any> {
    const url = `${this.apiUrl}/updateArticle`;
    const body = {
      articleId: article.articleId,
      name: article.name,
      articleCode: article.articleCode,
      articleCategoryId: article.articleCategoryId,
      articleStatusId: article.articleStatusId,
      publishDate: article.publishDate,
      description: article.description,
    };
    console.log(body);
    return this.http.put<any>(url, body);
  }

  deleteArticle(articleId: string): Observable<any> {
    const url = `${this.apiUrl}/deleteArticle`;
  
    let params = new HttpParams();
    params = params.set('articleId', articleId);

    return this.http.delete<any>(url, {params});
  }

  // updateArticle(article: app.models.ArticleSaveModel): Observable<any> {
  //   const url = `${this.apiUrl}/saveArticle`;
  //   const body = {
  //     name: article.name,
  //     articleCode: article.articleCode,
  //     articleCategoryId: article.articleCategoryId,
  //     articleStatusId: article.articleStatusId,
  //     publishDate: article.publishDate,
  //     description: article.description,
  //   };
  //   return this.http.post<any>(url, body);
  // }

}