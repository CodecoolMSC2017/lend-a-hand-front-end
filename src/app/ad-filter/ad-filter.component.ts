import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FilterAdsService} from '../filter-ads.service';
import {Filter} from '../filter.model';
@Component({
  selector: 'app-ad-filter',
  templateUrl: './ad-filter.component.html',
  styleUrls: ['./ad-filter.component.css']
})
export class AdFilterComponent implements OnInit {

  categories = ['All', 'Babysitting', 'IT', 'Garden', 'Learning', 'Building'];
  selectedCategory : String;
  filter:Filter;

  filterForm : FormGroup;
  

  constructor(private formBuilder: FormBuilder, private filterService:FilterAdsService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
    categories: [[Validators.required]]
    
});
  }

  filterAds(){
    this.filter.category=this.selectedCategory;
    return this.filterService.getFilteredAds(this.filter);// We need to call the listing of advertisements with the returned value of this line
  }

}
