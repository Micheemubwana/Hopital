import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonnelUsersService } from './personnel-users.service';
import { CreatePersonnelUserDto } from './dto/create-personnel-user.dto';
import { UpdatePersonnelUserDto } from './dto/update-personnel-user.dto';

@Controller('personnel-users')
export class PersonnelUsersController {
  constructor(private readonly personnelUsersService: PersonnelUsersService) {}

  @Post()
  create(@Body() createPersonnelUserDto: CreatePersonnelUserDto) {
    return this.personnelUsersService.create(createPersonnelUserDto);
  }

  @Get()
  findAll() {
    return this.personnelUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personnelUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonnelUserDto: UpdatePersonnelUserDto) {
    return this.personnelUsersService.update(+id, updatePersonnelUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personnelUsersService.remove(+id);
  }
}
