import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

    category: string;

    constructor(private gem: GlobalEventManagerService, private router: Router) {
    }

    ngOnInit() {
    }

    getAdsForCategory(category) {
        this.category = category;
        this.router.navigate(['ads']);
    }

    ngOnDestroy() {
        this.gem.updateCategoryFilter(this.category);
    }
}
