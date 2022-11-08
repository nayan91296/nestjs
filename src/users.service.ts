import { Injectable } from '@nestjs/common';

export interface User{
  name:string;
  age:number;
  id:number;
}

@Injectable()
export class UserService {
 private store = new Map<number, User>();

 createUser(user: User) {
  this.store.set(user.id, user);

  return { data:user, message: "USER ADDED" };
}

findUser(id: number) {
  // const user_data = this.store.get(id);
  // console.log('user',user_data);
  // console.log('store',this.store);
  // if (this.store.size == 0) {
  //   return { message: "USER NOT FOUND" };
  // }

  // return { message: "User get", data: this.store[1] };

 return this.store.get(id);

}

findUsers() {
  return Array.from(this.store).map(([_, user]) => user);
}

updateUser(id: number, user: User) {
  const userD = this.store.get(id);

  if (!userD) {
    return { message: "USER NOT FOUND" };
  }

  this.store.set(id, user);

  return { message: "USER UPDATED" };
}

deleteUser(id: number) {
  this.store.delete(id);

  return { message: "USER DELETED" };
}
}
