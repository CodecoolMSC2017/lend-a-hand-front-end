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

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit, OnDestroy {
    keyword: string;
    categories = ['All', 'Beauty', 'Child care', 'Construction', 'Education', 'Garden', 'Health care', 'Housework', 'IT', 'Office', 'Pets', 'Repair', 'Sports', 'Vehicle'];
    selectedCategory: string;
    userSub: Subscription;
    selectedType: string;

    user: User;

    constructor(private gem: GlobalEventManagerService, private router: Router, private authService: AuthorizationService) {
    }

    ngOnInit() {

        this.userSub = this.gem.userEmitter.subscribe(user => {
            this.user = user;
        });
    }

    filterAds() {
        if (this.keyword == null) {
            this.keyword = '';
        }

        if (this.selectedCategory == null) {
            this.selectedCategory = 'All';
        }

        if (this.selectedType == null) {
            this.selectedType = 'All';
        }

        if (this.keyword !== '' && this.selectedCategory === 'All' && this.selectedType === 'All') {
            this.gem.updateKeywordFilter(this.keyword);
        }

        if (this.selectedCategory !== 'All' && this.keyword === '' && this.selectedType === 'All') {
            this.gem.updateCategoryFilter(this.selectedCategory);
        }

        if (this.selectedType !== 'All' && this.keyword === '' && this.selectedCategory === 'All') {
            this.gem.updateTypeFilter(this.selectedType);
        }

        if (this.keyword !== '' && this.selectedCategory !== 'All' && this.selectedType === 'All') {
            this.gem.updateKeywordCategoryFilter(new KeywordCategoryFilterModel(this.keyword, this.selectedCategory));
        }

        if (this.keyword !== '' && this.selectedType !== 'All' && this.selectedCategory === 'All') {
            this.gem.updateKeywordTypeFilter(new KeywordTypeFilterModel(this.keyword, this.selectedType));
        }

        if (this.selectedCategory !== 'All' && this.selectedType !== 'All' && this.keyword === '') {
            this.gem.updateCategoryTypeFilter(new CategoryTypeFilterModel(this.selectedCategory, this.selectedType));
        }

        if (this.keyword !== '' && this.selectedCategory !== 'All' && this.selectedType !== 'All') {
            this.gem.updateKeywordCategoryTypeFilter(new KeywordCategoryTypeFilterModel(this.keyword, this.selectedCategory, this.selectedType));
        }

        if (this.keyword === '' && this.selectedCategory === 'All' && this.selectedType === 'All') {
            this.gem.updateNoFilter('No filter');
        }
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
            this.router.navigate(['login']);
        };
        this.authService.deleteAuth().subscribe(clearAuth, clearAuth);
    }

    toProfile(user: User) {
        this.gem.updateProfile(user);
        this.router.navigate(['profile']);
    }

    hideFilter(event) {
        console.log(event.target);
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
        this.userSub.unsubscribe();
    }

}
