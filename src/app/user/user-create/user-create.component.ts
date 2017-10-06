import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { UserService } from "../user.service";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit {

  private num: string;
  private user: User;
  userTitle = "";
  userForm: FormGroup;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {

  }
  
  ngOnInit() {
    this.user = new User(0,"", "");
    this.num = this.router.url.split('/')[3]; 
    this.getUser();

    this.userForm = this.formBuilder.group({
      name: [this.user.name, [
        Validators.required,
        Validators.minLength(1),
      ]],
      birthdate: [this.user.birthdate, [
        Validators.required
      ]]
    });
  }
   
  getUser() {
    if (this.num == "" || this.num == null ){
      this.userTitle = 'Create User';
    }
    else{
      this.userTitle = 'Edit User';
      this.userForm

      this.userService.findById(parseInt(this.num)).subscribe(
        user => { this.userForm.controls['name'].setValue(user.name),
                  this.userForm.controls['birthdate'].setValue((user.birthdate).split('T')[0]),
                  this.user.id = user.id },
        err => { console.log(err); }
      );
    }
  }

  redirectUsersListPage() {
    this.router.navigate(['/user']);
  }

  saveUser() {
    this.user.name = this.userForm.controls["name"].value;
    this.user.birthdate = this.userForm.controls["birthdate"].value;

    if (this.userTitle == 'Create User'){
      this.userService.saveUser(this.user);
      this.router.navigate(['/user']);
    }
    else{
      this.userService.updateUser(this.user);
      this.router.navigate(['/user']);
    }
  }

  onChange(target,value){
    this.user = this.user.setproperty(target,value,this.user);
  }
}
