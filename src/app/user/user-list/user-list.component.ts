import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { UserService } from "../user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  private users: User[];
  private filteredUsers: User[];
  constructor(private router: Router,
              private userService: UserService) { 
    this.getAllUsers();
  }

  ngOnInit() {
    this.getAllUsers();
  }
 
  getAllUsers() {
    this.userService.findAll().subscribe(
      users => {
        this.users = users;
        this.filteredUsers = users;
      },
      err => {
        console.log(err);
      }
    );
  }

  redirectNewUserPage() {
    this.router.navigate(['/user/create']);
  }
 
  editUserPage(user: User) {
    if (user) {
      this.router.navigate(['/user/edit', user.id]);
    }
  }
 
  deleteUser(user: User) {
    this.userService.deleteUserById(user.id);
    this.getAllUsers();
  }

  assignCopy(){
    this.filteredUsers = Object.assign([], this.users);
  }
  filterItem(value, prop){
      if(!value) this.assignCopy(); //when nothing has typed

      if (prop == "name")
        this.filteredUsers = Object.assign([], this.users).filter(
          item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      else
        this.filteredUsers = Object.assign([], this.users).filter(
          item => item.birthdate.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
  }
}
