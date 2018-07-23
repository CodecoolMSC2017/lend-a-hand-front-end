import { Component, OnInit } from '@angular/core';
import {GlobalEventManagerService} from '../global-event-manager.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  keyword:string;
  categories = ['All', 'Babysitting', 'IT', 'Garden', 'Learning', 'Building']
  selectedCategory : string;
  
  constructor(private gem : GlobalEventManagerService) { }

  ngOnInit() {
  }

  search(){
    this.gem.updateKeywordFilter(this.keyword);
  }

  filterCategory(){
    this.gem.updateCategoryFilter(this.selectedCategory);
  }

  backToMain(){
    this.gem.updateCategoryFilter("All");
    this.keyword="";
  }

}
