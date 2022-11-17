import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DogsService {
  apiKey =
    'live_07Lrq6cZiqYsD1hmPpqJC5yinbrmleSizJa40OfqEUrdwnbPfjMM3DvwPenmf474';
  apiUrl = 'https://api.thedogapi.com/v1/breeds';

  constructor(public http: HttpClient) {}

  getDogBreeds() {
    return this.http.get(this.apiUrl, {
      headers: new HttpHeaders({
        'x-api-key': this.apiKey,
      }),
    });
  }
}
