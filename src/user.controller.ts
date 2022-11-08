import { Inject, Controller, Get, Req, HttpCode, HttpStatus, Res, Header, Redirect, Param, Query, Headers, Body, Post, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { get } from 'http';
import {createUserDTO} from './DTO';
import { Config  } from './config';
import { Subject } from 'rxjs';
import { UserService } from './users.service';

class paramVariable{
    id:5;
    name:'nayan';
}

const userData = [];

@Controller('/user')
export class UserController {
  // constructor(@Inject('EVENT_STORE') private event_store:Subject<any> ) {
  //   console.log(this.event_store);
  // }

  constructor(private usersService: UserService) {}

//   @Get('getHello')
// //   @HttpCode(HttpStatus.BAD_REQUEST)
// //   @Header('Cache-control','none')
// //   @Header('demo','nayan')
// //   @Redirect('/user/other')
//   getHello(@Req() req:Request, @Body() requestData:Record<string,any>/*@Headers() Headers: Record<string, any>/*@Query() query:paramVariable/*@Param('name') params:paramVariable/*@Param('id') params:Record<string, any> /*, @Res({passthrough:true}) res:Response*/) {
//     console.log(requestData);

//     var uniqnumber = Math. random() * (10 + 1);

//     // if(uniqnumber > 5){
//     //     return {
//     //         url:'/user/other',
//     //         statusCode:200
//     //     }
//     // }else{
//     //     return {
//     //         url:'/user/else',
//     //         statusCode:200
//     //     }
//     // }

//     return 'done';
//     // res.status(200);
//     // res.json({
//     //     name:'nayan'
//     // });
//   }

//   @Get('/other')
//   getOther() {
//     // console.log(req);
//     return 'redirect url other';
//     // res.status(200);
//     // res.json({
//     //     name:'nayan'
//     // });
//   }

//   @Get('/else')
//   getElse() {
//     // console.log(req);
//     return 'redirect url else';
//     // res.status(200);
//     // res.json({
//     //     name:'nayan'
//     // });
//   }

//   @Post()
//   createUser(@Body() createuserdto:createUserDTO){
//     userData.push(createuserdto);
//     return {
//         data:userData,
//         message:'added'
//     }
//   }

//   @Get('get')
//   getUser(){
//     // userData.push(createuserdto);
//     return userData;
//   }

//   @Get('/byid/:id')
//   getUserById(@Param('id') id:number){
   
//     return userData.find((user)=>user.id == id);
//   }

//   @Put('/update/:id')
//   updateUser(@Param('id') id:number, @Body() updateuserdto:createUserDTO){
//     // console.log(updateuserdto);
//     // console.log(id);
//     const index = userData.findIndex(object => {
//       return object.id === id;
//     });
//     // console.log(userData.findIndex((user)=>user.id == id));
//     // var userD = userData.findIndex((user)=>user.id == id);
//     // console.log('userD',userD);
//     userData[index] = updateuserdto;
//     // console.log(userData);

//   }

//   @Delete('/delete/:id')
//   deleteUser(@Param('id') id:number){
//     const index = userData.findIndex(object => {
//       return object.id === id;
//     });
//     userData.splice(index, 1);
//     return userData;

//   }


  @Post('/create')
  createUser(@Body() createUserDto: createUserDTO) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/get')
  findAllUsers() {
    return this.usersService.findUsers();
  }

  @Get("get/:id")
  findUserById(@Param("id") id: number) {
    return this.usersService.findUser(id);
  }

  @Put("update/:id")
  updateUser(@Param("id") id: number, @Body() updateUserDto: createUserDTO) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: number) {
    return this.usersService.deleteUser(id);
  }
}
