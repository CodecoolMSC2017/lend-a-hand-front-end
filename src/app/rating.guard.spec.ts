import {inject, TestBed} from '@angular/core/testing';

import {RatingGuard} from './rating.guard';

describe('RatingGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RatingGuard]
        });
    });

    it('should ...', inject([RatingGuard], (guard: RatingGuard) => {
        expect(guard).toBeTruthy();
    }));
});
