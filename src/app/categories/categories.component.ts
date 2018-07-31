import {Component, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {FilterSettingsModel} from '../model/filter-settings.model';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    category: string;
    user: User;

    constructor(private gem: GlobalEventManagerService, private router: Router) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
    }

    getAdsForCategory(category) {
        this.category = category;
        const filterSettings = new FilterSettingsModel();
        filterSettings.keyword = '';
        filterSettings.selectedCategory = category;
        filterSettings.selectedType = 'All';
        this.gem.updateFilterSettings(filterSettings);
        this.router.navigate(['ads']);
    }
}

