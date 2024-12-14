import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post("login")
  login(@Body("email") email: string, @Body("password") password: string){
    return this. usersService.login(email, password);
  }

  @Get("auth/:id/:email")
  getOne(@Param("id") id:string){
    return this.usersService.getOne(id);
  }

  @EventPattern('patient-created')
  createPatient(
    @Payload() data: any,
    @Ctx() context: NatsStreamingContext,
  ) {
    console.log(`received message: ${JSON.stringify(data)}`);
    try {
      this.usersService.createPatient(CreateUserDto)
      context.message.ack();
    } catch (error) {
      console.log(error);
      context.message.ack();
    }
  }

}
