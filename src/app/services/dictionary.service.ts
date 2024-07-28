import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { map } from 'rxjs/internal/operators/map';


@Injectable()
export class DictionaryService {
  constructor(private http: HttpClient) {
  }

  public getCategories() {
    var url = 'https://localhost:7038/api/Dictionary/getArticleCategories'
    return this.http.get(url).pipe(
        map((response: any) => response)
      );
  }

  public getStatuses() {
    var url = 'https://localhost:7038/api/Dictionary/getArticleStatuses'
    return this.http.get(url).pipe(
        map((response: any) => response)
      );
  }

}