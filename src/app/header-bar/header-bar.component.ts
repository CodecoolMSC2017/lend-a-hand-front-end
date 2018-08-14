import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {AuthorizationService} from '../service/authorization.service';
import {Subscription} from 'rxjs';
import {FilterSettingsModel} from '../model/filter-settings.model';
import {delay} from 'rxjs/internal/operators';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit, OnDestroy {
    filterSettings: FilterSettingsModel = new FilterSettingsModel();
    categories = ['All', 'Beauty', 'Child care', 'Construction', 'Education', 'Garden',
        'Health care', 'Housework', 'IT', 'Office', 'Pets', 'Repair', 'Sports', 'Vehicle'];
    userSub: Subscription;
    user: User;

    constructor(private gem: GlobalEventManagerService, private router: Router, private authService: AuthorizationService) {
    }

    ngOnInit() {
        this.filterSettings.keyword = '';
        this.filterSettings.selectedCategory = 'All';
        this.filterSettings.selectedType = 'All';
        this.userSub = this.gem.userEmitter
            .pipe(delay(0))
            .subscribe(user => {
                this.user = user;
            });

    }

    filterAds() {
        this.gem.updateFilterSettings(this.filterSettings);
        this.router.navigate(['ads']);
    }

    toUsers() {
        this.router.navigate(['users']);
    }


    login() {
        this.router.navigate(['login']);
    }

    register() {
        this.router.navigate(['register']);
    }

    logout() {
        const clearAuth = () => {
            sessionStorage.clear();
            this.gem.updateUser(null);
            this.router.navigate(['login']);
        };
        this.authService.deleteAuth().subscribe(clearAuth, clearAuth);
    }

    toProfile(user: User) {
        this.gem.updateProfile(user);
        this.router.navigate(['profile']);
    }

    onCreateAdClicked() {
        if (this.user.ableToAd) {
            this.router.navigate(['createAd']);
        } else {
            this.router.navigate(['profile']);
        }
    }

    onMessagesClicked() {
        this.router.navigate(['messages']);
    }

    hideFilter(event) {
        if (event.target.id === 'detailedSearch' || event.target.id === 'keyword-input' || event.target.id === 'filters'
            || event.target.id === 'category-filter' || event.target.id === 'hire-offer-filter' || event.target.id === 'strong-category'
            || event.target.id === 'strong-hire-offer' || event.target.id === 'category-select' || event.target.id === 'type-select') {
            return;
        }
        document.getElementById('filters').classList.add('hidden');
        document.getElementById('detailedSearch').innerText = '►';
    }

    showFilters() {
        if (document.getElementById('filters').classList.contains('hidden')) {
            document.getElementById('filters').classList.remove('hidden');
            document.getElementById('detailedSearch').innerText = '▼';
            document.getElementsByTagName('body').item(0).addEventListener('click', this.hideFilter);
        } else {
            document.getElementById('filters').classList.add('hidden');
            document.getElementById('detailedSearch').innerText = '►';
            document.getElementsByTagName('body').item(0).removeEventListener('click', this.hideFilter);

        }
    }

    ngOnDestroy() {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
    }
}
