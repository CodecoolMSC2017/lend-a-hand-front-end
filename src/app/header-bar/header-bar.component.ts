import { Component, OnInit } from '@angular/core';
import {GlobalEventManagerService} from '../global-event-manager.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  keyword:string;
  
  constructor(private gem : GlobalEventManagerService) { }

  ngOnInit() {
  }

  search(){
    this.gem.updateKeywordFilter(this.keyword);
  }

  backToMain(){
    this.gem.updateCategoryFilter("All");
    this.keyword="";
  }

}
