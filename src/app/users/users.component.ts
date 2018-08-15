import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:User[];
  user:User;


  constructor(private userService:UserService,private gem:GlobalEventManagerService,private router:Router) { }



  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.gem.updateUser(this.user);
    this.userService.getAllUser().subscribe(users =>{
     
      this.users=users;
    })
  }

  toUserProfile(user){
    this.gem.updateProfile(user);
    this.router.navigate(["profile"]);

  }

}
