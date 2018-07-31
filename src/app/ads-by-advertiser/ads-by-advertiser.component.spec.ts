import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdsByAdvertiserComponent} from './ads-by-advertiser.component';

describe('AdsByAdvertiserComponent', () => {
    let component: AdsByAdvertiserComponent;
    let fixture: ComponentFixture<AdsByAdvertiserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdsByAdvertiserComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdsByAdvertiserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
