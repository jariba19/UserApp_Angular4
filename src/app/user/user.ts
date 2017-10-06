export class User {
 
  id: number;
  name: string;
  birthdate: string;
 
  constructor(id: number, name: string, birthdate: string){
    this.id = id;
    this.name = name;
    this.birthdate = birthdate;
  }
 
  setproperty(target: string, value: string, user: User){
    if(target == "name"){
      user.name = value;
      return user;
    }
    else{
      user.birthdate = value;
      return user;
    }
  }
}
