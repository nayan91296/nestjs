import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { createUserDTO } from './DTO/create-user.dto';
import { updateUserDTO } from './DTO/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';


// export interface User{
//   firstName:string;
//   lastName:string;
//   age:string;
//   id:number;
// }

@Injectable()
export class UserService {
//  private store = new Map<number, User>();
constructor(@InjectRepository(User) private readonly userRepository: Repository<any>){

}

 create(createUserDto: createUserDTO) :Promise<User>{
  let user : User = new User();
  user.firstName = createUserDto.firstName;
  user.lastName = createUserDto.lastName;
  user.age = createUserDto.age;
  return this.userRepository.save(user);
  // this.store.set(user.id, user);

  // return { data:user, message: "USER ADDED" };
}

findUser(id : number) {
 
 return this.userRepository.findOne({where:{id:id}});

}

findUsers() :Promise<User[]>{
  return this.userRepository.find();
}

updateUser(id: number, updateUserDto: updateUserDTO) {
  
  let user : User = new User();
  user.firstName = updateUserDto.firstName;
  user.lastName = updateUserDto.lastName;
  user.age = updateUserDto.age;
  user.id = id;
  return this.userRepository.update(id,user);
}

deleteUser(id: number) {
  return this.userRepository.delete(id);
}
}
