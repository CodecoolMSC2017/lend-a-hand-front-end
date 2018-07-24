import {Component, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../global-event-manager.service';
import {Router} from '@angular/router';
import {User} from '../user.model';
import {Filter} from '../filter.model';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
    keyword: string;
    categories = ['All', 'Babysitting', 'IT', 'Garden', 'Learning', 'Building'];
    selectedCategory: string;
    selectedType: string;
    
    user: User;

    constructor(private gem: GlobalEventManagerService, private router: Router) {
    }

    ngOnInit() {

        this.gem.userEmitter.subscribe(user => {
            this.user = user;
        });
    }

    filterByKeywordAndCategory() {
        if (this.keyword == null) {
            this.keyword = '';
        }
        if (this.selectedCategory == null) {
            this.selectedCategory = 'All';
        }
        if (this.keyword && this.selectedCategory === 'All') {
            this.gem.updateKeywordFilter(this.keyword);
        }
        if (this.selectedCategory && this.keyword === '') {
            this.gem.updateCategoryFilter(this.selectedCategory);
        }
        if (this.keyword !== '' && this.selectedCategory !== 'All') {
            this.gem.updateFilter(new Filter(this.keyword, this.selectedCategory));
        }
    }

    login() {
        this.router.navigate(['login']);
    }

    showFilters() {
        if (document.getElementById('filters').classList.contains('hidden')) {
            document.getElementById('filters').classList.remove('hidden');
        } else {
            document.getElementById('filters').classList.add('hidden');
        }

    }

}
