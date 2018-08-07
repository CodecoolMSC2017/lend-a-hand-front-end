import {Component, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {User} from '../model/user.model';
import {MessageService} from '../service/message.service';
import {Contact} from '../model/contact.model';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    user: User;
    contacts: Contact[];
    activeContact: Contact;

    constructor(private gem: GlobalEventManagerService, private messageService: MessageService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
        this.messageService.getContactsByUserId(this.user.id).subscribe(response => {
            this.contacts = response;
            this.activeContact = this.contacts[0];
            console.log(this.activeContact);

        });
    }

    standBy(id) {
        (<HTMLImageElement>document.getElementById(id)).src = 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg';
    }

    setActiveContact(contact: Contact) {
        this.activeContact = contact;
    }

}
