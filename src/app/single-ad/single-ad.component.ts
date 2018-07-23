import { Component, OnInit } from '@angular/core';
import{Ad} from '../ad.model';
@Component({
  selector: 'app-single-ad',
  templateUrl: './single-ad.component.html',
  styleUrls: ['./single-ad.component.css']
})
export class SingleAdComponent implements OnInit {
  ad:Ad;
  constructor() { }

  ngOnInit() {
  }

}
