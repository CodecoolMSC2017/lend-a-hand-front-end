import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalEventManagerService {

    private categoryFilterTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public categoryFilterEmitter: Observable<string> = this.categoryFilterTrigger.asObservable();

    private keywordFilterTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public keywordFilterEmitter: Observable<string> = this.keywordFilterTrigger.asObservable();

    public updateCategoryFilter(category: string): void {
        this.categoryFilterTrigger.next(category);
    }

    public updateKeywordFilter(keyword: string): void {
        this.keywordFilterTrigger.next(keyword);
    }

    constructor() {
    }
}
