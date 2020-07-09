import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../shared/services/api-user.service';
import { User } from '../shared/models';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  
  users : User[] = [] ;
  searchParam : string;

  constructor(private userService: ApiUserService, private alertify: AlertifyService) { }


  ngOnInit() {
    this.getAllUsers();
    console.log(this.users);
    
  }

  getAllUsers(){
    this.userService.getUsers().subscribe((res : User[]) => {
      for(var i = 0; i < res.length; i++){
        this.users.push(res[i]);
      }
     // console.log(res[0]);
    },
     error => console.log(error));
  }

  getUserByName(searchParam){
    console.log(searchParam);
    if (!searchParam){
      this.getAllUsers(); 
    }
    this.userService.getUserByName(searchParam).subscribe((res : User[]) => {
      console.log(res);
     
        this.users = [];
        for(var i = 0; i < res.length; i++){
          this.users.push(res[i]);
        }
      
      this.alertify.success("search for " + searchParam);
    },
    error => console.log(error));
    
  }

}
