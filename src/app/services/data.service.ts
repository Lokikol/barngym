import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AuthHttp } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class DataService {
  constructor(private url: string, private http: Http, private authHttp?: AuthHttp) { }

    getAll(authRoute?: boolean) {
      if (authRoute && this.authHttp) {
        return this.authHttp.get(this.url)
          .map(response => response.json())
          .catch(this.handleError);  
      } else {
        return this.http.get(this.url)
          .map(response => response.json())
          .catch(this.handleError);
      }
    }

    create(resource, authRoute?: boolean) {
      if (authRoute && this.authHttp) {
        return this.authHttp.post(this.url, JSON.stringify(resource))
          .map(response => response.json())
          .catch(this.handleError);
      } else {
        return this.http.post(this.url, JSON.stringify(resource))
          .map(response => response.json())
          .catch(this.handleError);
      }
    }

    update(resource, authRoute?: boolean) {
      if (authRoute && this.authHttp) {
        return this.authHttp.patch(this.url + '/' + resource.id, JSON.stringify(resource))
          .map(response => response.json())
          .catch(this.handleError);
      } else {
        return this.http.patch(this.url + '/' + resource.id, JSON.stringify(resource))
          .map(response => response.json())
          .catch(this.handleError);
      }
    }

    delete(id, authRoute?: boolean) {
      if (authRoute && this.authHttp) {
        return this.authHttp.delete(this.url + '/' + id)
          .map(response => response.json())
          .catch(this.handleError);
      } else {
        return this.http.delete(this.url + '/' + id)
          .map(response => response.json())
          .catch(this.handleError);
      }
    }

    private handleError(error: Response) {
      if (error.status === 400) {
        return Observable.throw(new BadInput(error.json()));
      }
      
      if (error.status === 404) {
        return Observable.throw(new NotFoundError());
      }

      return Observable.throw(new AppError(error));
    }
}
