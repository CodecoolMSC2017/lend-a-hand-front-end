import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {FilterSettingsModel} from '../model/filter-settings.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

    category: string;
    user: User;
    info: string;
    infoSub: Subscription;

    constructor(private gem: GlobalEventManagerService, private router: Router) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);

        this.infoSub = this.gem.infoEmitter.subscribe(info => {
            if (info) {
                this.info = info;
                setTimeout(this.clearAlert, 3000);
            } else {
                this.clearAlert();
            }
        });
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

    ngOnDestroy(): void {
        this.gem.updateInfo(null);
        if (this.infoSub) {
            this.infoSub.unsubscribe();
        }
    }

    clearAlert() {
        this.info = '';
    }
}

