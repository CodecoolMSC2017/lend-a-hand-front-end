import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {KeywordCategoryFilterModel} from '../model/keyword-category-filter.model';
import {KeywordTypeFilterModel} from '../model/keyword-type-filter.model';
import {CategoryTypeFilterModel} from '../model/category-type-filter.model';
import {KeywordCategoryTypeFilterModel} from '../model/keyword-category-type-filter.model';
import {AuthorizationService} from '../service/authorization.service';
import {Subscription} from 'rxjs';
import {FilterSettingsModel} from '../model/filter-settings.model';

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
        this.gem.filterSettingsEmitter.subscribe(filterSettings => {
            this.filterSettings = filterSettings;
        });
        this.userSub = this.gem.userEmitter.subscribe(user => {
            this.user = user;
        });
    }

    filterAds() {
        if (this.filterSettings.keyword == null) {
            this.filterSettings.keyword = '';
        }

        if (this.filterSettings.selectedCategory == null) {
            this.filterSettings.selectedCategory = 'All';
        }

        if (this.filterSettings.selectedType == null) {
            this.filterSettings.selectedType = 'All';
        }

        if (this.filterSettings.keyword !== ''
            && this.filterSettings.selectedCategory === 'All'
            && this.filterSettings.selectedType === 'All') {
            this.gem.updateKeywordFilter(this.filterSettings.keyword);
        }

        if (this.filterSettings.selectedCategory !== 'All'
            && this.filterSettings.keyword === ''
            && this.filterSettings.selectedType === 'All') {
            this.gem.updateCategoryFilter(this.filterSettings.selectedCategory);
        }

        if (this.filterSettings.selectedType !== 'All'
            && this.filterSettings.keyword === ''
            && this.filterSettings.selectedCategory === 'All') {
            this.gem.updateTypeFilter(this.filterSettings.selectedType);
        }

        if (this.filterSettings.keyword !== ''
            && this.filterSettings.selectedCategory !== 'All'
            && this.filterSettings.selectedType === 'All') {
            this.gem.updateKeywordCategoryFilter(new KeywordCategoryFilterModel(this.filterSettings.keyword,
                this.filterSettings.selectedCategory));
        }

        if (this.filterSettings.keyword !== ''
            && this.filterSettings.selectedType !== 'All'
            && this.filterSettings.selectedCategory === 'All') {
            this.gem.updateKeywordTypeFilter(new KeywordTypeFilterModel(this.filterSettings.keyword,
                this.filterSettings.selectedType));
        }

        if (this.filterSettings.selectedCategory !== 'All'
            && this.filterSettings.selectedType !== 'All'
            && this.filterSettings.keyword === '') {
            this.gem.updateCategoryTypeFilter(new CategoryTypeFilterModel(this.filterSettings.selectedCategory,
                this.filterSettings.selectedType));
        }

        if (this.filterSettings.keyword !== ''
            && this.filterSettings.selectedCategory !== 'All'
            && this.filterSettings.selectedType !== 'All') {
            this.gem.updateKeywordCategoryTypeFilter(new KeywordCategoryTypeFilterModel(this.filterSettings.keyword,
                this.filterSettings.selectedCategory, this.filterSettings.selectedType));
        }

        if (this.filterSettings.keyword === ''
            && this.filterSettings.selectedCategory === 'All'
            && this.filterSettings.selectedType === 'All') {
            this.gem.updateNoFilter('No filter');
        }
        this.filterSettings = new FilterSettingsModel();
        this.router.navigate(['ads']);
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
        this.router.navigate(['createAd']);
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
