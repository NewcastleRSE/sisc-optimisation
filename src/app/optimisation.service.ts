import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OptimisationService {

  constructor(private http: HttpClient) {
  }

  // get coverage for a user defined network
  async getCoverage(query: any) {

    return this.http.post('https://optimisation-backend.azurewebsites.net/coverage', query, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(map((response) => response));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
