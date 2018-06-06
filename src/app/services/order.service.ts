import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private http: Http) {
  }

  getOrders() { 
    return this.http.get('/api/orders')
    .pipe(map(response => response.json()));
  }
}
