declare namespace app.models { 
    export interface ArticleModel { 
        articleId: string;
        name: string;
        articleCode: string,
        articleCategoryName: string;
        articleStatusName: string;
        publishDate: Date;
        description: string;
        articleCategoryId: string;
        articleStatusId: string;
    }

    export interface DictionaryModel { 
        id: string;
        value: string;
        code: string;
    }

    export interface ArticleSaveModel { 
        articleId: string | undefined;
        name: string;
        articleCode: string;
        articleCategoryId: string;
        articleStatusId: string;
        publishDate: Date;
        description: string;
    }
}