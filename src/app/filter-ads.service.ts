import { Injectable } from '@angular/core';
import {Filter} from './filter.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilterAdsService {

  constructor() { }

  getFilteredAds(filter:Filter){
    
  }

}
