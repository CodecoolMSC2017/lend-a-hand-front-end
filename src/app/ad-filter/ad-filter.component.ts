import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalEventManagerService} from '../global-event-manager.service';

@Component({
    selector: 'app-ad-filter',
    templateUrl: './ad-filter.component.html',
    styleUrls: ['./ad-filter.component.css']
})
export class AdFilterComponent implements OnInit {

    categories = ['All', 'Babysitting', 'IT', 'Garden', 'Learning', 'Building'];
    selectedCategory: string;
    selectedType: string;


    filterForm: FormGroup;


    constructor(private formBuilder: FormBuilder, private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        this.filterForm = this.formBuilder.group({
            categories: [[Validators.required]]

        });
    }

    filterAds() {
        this.gem.updateCategoryFilter(this.selectedCategory);
    }

}


