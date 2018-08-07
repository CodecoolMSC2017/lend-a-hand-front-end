import {Component, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {User} from '../model/user.model';
import {MessageService} from '../service/message.service';
import {Contact} from '../model/contact.model';
import {Message} from '../model/message.model';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    user: User;
    contacts: Contact[];
    activeContact: Contact;
    loaded = false;
    error: string;

    constructor(private gem: GlobalEventManagerService, private messageService: MessageService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
        this.messageService.getContactsByUserId(this.user.id).subscribe(response => {
            this.contacts = response;
            this.activeContact = this.contacts[0];
            this.loaded = true;

        });
    }

    standBy(id) {
        (<HTMLImageElement>document.getElementById(id)).src = 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg';
    }

    setActiveContact(contact: Contact) {
        this.activeContact = contact;
    }

    sendMessage() {
        const text = (<HTMLInputElement>document.getElementById('message-input')).value;
        if (text === '' || text === null || text === undefined || text === ' ') {
            return;
        }
        (<HTMLInputElement>document.getElementById('message-input')).value = '';
        const message = new Message();
        message.senderId = this.user.id;
        message.receiverId = this.activeContact.user.id;
        message.text = text;
        this.messageService.createMessage(message).subscribe(newMessage => {
            this.activeContact.messages.push(newMessage);
            this.activeContact.lastMessage = newMessage;
            setTimeout(this.scrollDown, 50);
        }, error => {
            if (error.error !== null) {
                this.error = error.error;
            } else {
                this.error = error;
            }
            setTimeout(this.clearAlert, 3000);
        });

    }

    scrollDown() {
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.scrollTop = messageContainer.scrollHeight + 300;
    }

    clearAlert() {
        this.error = '';
    }

}
