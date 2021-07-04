import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { fake } from "../models/fake";
import { Resource } from '../models/resource';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  x1 = environment.x1;
  y1 = environment.y1;
  x2 = environment.x2;
  y2 = environment.y2;

  constructor(private http: HttpClient) { }

  getResources() {
    let url = `https://apidev.meep.me/tripplan/api/v1/routers/lisboa/resources?lowerLeftLatLon=${this.x1},${this.y1}&upperRightLatLon=${this.x2},${this.y2}&companyZoneIds=545,467,473`
    return of(fake.fakeResources).pipe(delay(1))
    // return this.http.get<Resource[]>(url).pipe()
  }
}
