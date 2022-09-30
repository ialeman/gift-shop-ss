import { Injectable, Inject } from '@angular/core';
import { API_URL } from '../api-url.token';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../../common/models/Categories';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private readonly _url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_URL) apiUrl: string
    ) { this._url = `${apiUrl}/api/categories`; }

    add(model: any){
        return this.http.post(this._url, model);
    }

    edit(model: any){
        return this.http.put(this._url, model);
    }

    getCategories() {
        return this.http.get(this._url).toPromise()
            .then(res => <Categories[]>(res as any))
            .then(data => {
                return data;
            });
    }


}
