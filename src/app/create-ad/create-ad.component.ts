import {Component, OnInit} from '@angular/core';
import {AdService} from '../service/ad.service';
import {Ad} from '../model/ad.model';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {UploadFileService} from '../service/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-create-ad',
    templateUrl: './create-ad.component.html',
    styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

    categories = ['Beauty', 'Child care', 'Construction', 'Education', 'Garden', 'Health care', 'Housework', 'IT',
        'Office', 'Pets', 'Repair', 'Sports', 'Vehicle'];
    selectedCategory: string;
    selectedType: string;
    isPremium: boolean;
    adTitle: string;
    adPayment: number;
    adDescription: string;
    ad: Ad = new Ad();
    error: string;
    user: User;
    uploadedPictureLink: string;

    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = {percentage: 0};

    constructor(private adservice: AdService, private router: Router, private gem: GlobalEventManagerService,
                private uploadService: UploadFileService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
    }

    sendAd() {
        if (!this.selectedCategory) {
            this.error = 'Category must be selected';
            this.showError();
            return;
        }
        if (!this.selectedType) {
            this.error = 'Type must be selected';
            this.showError();
            return;
        }
        if (!this.adTitle) {
            this.error = 'Title field is required';
            this.showError();
            return;
        }
        if (!this.adDescription) {
            this.error = 'Description field is required';
            this.showError();
            return;
        }
        if (this.adPayment) {
            if (!Number.isInteger(this.adPayment) || this.adPayment < 1 || this.adPayment > 100) {
                this.error = 'Invalid payment format';
                this.showError();
                return;
            }
        }
        if (this.isPremium) {
            if (this.user.balance < 1) {
                this.router.navigate(['payment']);
            }
        }
        if (this.user.type === 'company') {
            this.isPremium = true;
        }
        this.ad.advertiserName = this.user.userName;
        this.ad.advertiserId = this.user.id;
        this.ad.isPremium = this.isPremium;
        this.ad.category = this.selectedCategory;
        this.ad.description = this.adDescription;
        this.ad.title = this.adTitle;
        this.ad.payment = this.adPayment;
        this.ad.type = this.selectedType;
        this.ad.pictureLink = this.uploadedPictureLink;

        this.adservice.createAd(this.ad).subscribe(user => {
            sessionStorage.setItem('user', JSON.stringify(user));
            this.gem.updateUser(user);
                this.gem.updateInfo('Advertisement successfully created');
                this.router.navigate(['categories']);
            }, serverError => {
            this.handleError(serverError);
            }
        );

    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }

    upload() {
        this.currentFileUpload = this.selectedFiles.item(0);
        if (!this.validateFile(this.currentFileUpload)) {
            return;
        }
        this.progress.percentage = 0;
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                this.uploadedPictureLink = event.body as string;
                console.log('File is completely uploaded!');
            }
        });

        this.selectedFiles = undefined;
    }

    validateFile(file: File): boolean {
        const extension = file.name.split('.').pop();
        const acceptableExtensions = ['jpe', 'jpg', 'png', 'gif', 'jpeg', 'ico'];
        if (acceptableExtensions.indexOf(extension) === -1) {
            this.error = 'Invalid file format';
            this.showError();
            return false;
        }
        if (file.size > 99000000) {
            this.error = 'File size too large';
            this.showError();
            return false;
        }
        return true;
    }


    clearAlert() {
        document.getElementById('error').classList.add('hidden');
        document.getElementById('info').classList.remove('hidden');
    }

    showError() {
        document.getElementById('info').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
        setTimeout(this.clearAlert, 3000);
    }


    handleError(error) {
        if (error.status === 401) {
            sessionStorage.clear();
            this.gem.updateUser(null);
            this.router.navigate(['login']);
        } else {
            if (error.error !== null) {
                this.error = error.error.message;
            } else {
                this.error = error.message;
            }
        }
        this.showError();
    }


}
