import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientUsersService } from './patient-users.service';
import { CreatePatientUserDto } from './dto/create-patient-user.dto';
import { UpdatePatientUserDto } from './dto/update-patient-user.dto';

@Controller('patient-users')
export class PatientUsersController {
  constructor(private readonly patientUsersService: PatientUsersService) {}

  @Post()
  create(@Body() createPatientUserDto: CreatePatientUserDto) {
    return this.patientUsersService.create(createPatientUserDto);
  }

  @Get()
  findAll() {
    return this.patientUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientUserDto: UpdatePatientUserDto) {
    return this.patientUsersService.update(+id, updatePatientUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientUsersService.remove(+id);
  }
}
