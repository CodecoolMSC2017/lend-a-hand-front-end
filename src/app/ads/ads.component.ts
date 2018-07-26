import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdService} from '../service/ad.service';
import {Router} from '@angular/router';
import {Ad} from '../model/ad.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit, OnDestroy {

    ads: Ad[];
    keyword: string;
    category: string;
    keywordSub: Subscription;
    categorySub: Subscription;
    typeSub: Subscription;
    keywordCategoryFilterSub: Subscription;
    keywordTypeFilterSub: Subscription;
    categoryTypeFilterSub: Subscription;
    keywordCategoryTypeFilterSub: Subscription;
    infoSub: Subscription;

    constructor(private router: Router,
                private adService: AdService,
                private gem: GlobalEventManagerService) {
    }

    showAd(ad: Ad) {
        this.gem.updateSingleAd(ad);
        this.router.navigate(['ad']);
    }

    ngOnInit() {

        this.keywordSub = this.gem.keywordFilterEmitter.subscribe(keyword => {
            if (keyword) {
                this.adService.getAdsByKeyword(keyword).subscribe(ads => {
                    this.ads = ads;
                });
            }
        });

        this.categorySub = this.gem.categoryFilterEmitter.subscribe(category => {
            if (category) {
                this.adService.getAdsByCategory(category).subscribe(ads => {
                    this.ads = ads;
                });
            }
        });

        this.typeSub = this.gem.typeFilterEmitter.subscribe(type => {
            if (type) {
                this.typeSub = this.adService.getAdsByType(type).subscribe(ads => {
                    this.ads = ads;
                });
            }
        });

        this.keywordCategoryFilterSub = this.gem.keywordCategoryFilterEmitter.subscribe(keywordCategoryFilter => {
            if (keywordCategoryFilter) {
                this.adService.getAdsByKeywordAndCategory(keywordCategoryFilter.keyword, keywordCategoryFilter.category).subscribe(ads => {
                    this.ads = ads;
                });
            }
        });

        this.keywordTypeFilterSub = this.gem.keywordTypeFilterEmitter.subscribe(keywordTypeFilter => {
            if (keywordTypeFilter) {
                this.adService.getAdsByKeywordAndType(keywordTypeFilter.keyword, keywordTypeFilter.type).subscribe(ads => {
                    this.ads = ads;
                });
            }
        });

        this.categoryTypeFilterSub = this.gem.categoryTypeFilterEmitter.subscribe(categoryTypeFilter => {
            if (categoryTypeFilter) {
                this.adService.getAdsByCategoryAndType(categoryTypeFilter.category, categoryTypeFilter.type).subscribe(ads => {
                    this.ads = ads;
                });
            }
        });

        this.keywordCategoryTypeFilterSub = this.gem.keywordCategoryTypeFilterEmitter.subscribe(keywordCategoryTypeFilter => {
            if (keywordCategoryTypeFilter) {
                this.adService.getAdsByKeywordAndCategoryAndType(keywordCategoryTypeFilter.keyword, keywordCategoryTypeFilter.category, keywordCategoryTypeFilter.type).subscribe(ads => {
                    this.ads = ads;
                });
            }
        });

        this.infoSub = this.gem.noFilterEmitter.subscribe(info => {
            if (info) {
                this.adService.getAds().subscribe(ads => {
                    this.ads = ads;
                });
            }
        });
    }

    ngOnDestroy() {
        if (this.keywordSub) {
            this.keywordSub.unsubscribe();
        }
        if (this.categorySub) {
            this.categorySub.unsubscribe();
        }
        if (this.typeSub) {
            this.typeSub.unsubscribe();
        }
        if (this.keywordCategoryFilterSub) {
            this.keywordCategoryFilterSub.unsubscribe();
        }
        if (this.keywordTypeFilterSub) {
            this.keywordTypeFilterSub.unsubscribe();
        }
        if (this.categoryTypeFilterSub) {
            this.categoryTypeFilterSub.unsubscribe();
        }
        if (this.keywordCategoryTypeFilterSub) {
            this.keywordCategoryTypeFilterSub.unsubscribe();
        }
        if (this.infoSub) {
            this.infoSub.unsubscribe();
        }
    }
}
