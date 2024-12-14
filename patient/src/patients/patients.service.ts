import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly publisherService: Publisher
  ){}

  async create(createPatientDto: CreatePatientDto) {
    const patient =  await this.patientRepository.save(createPatientDto)
    if(!patient){
      throw new HttpException("le patient n'est pas enrigistré", HttpStatus.CONFLICT)
    }
    const data ={
      email: patient.email,
      nom_user: patient.nom,
      numero_tel: patient.numero_tel,
      patientId: patient.id
    }
    this.publisherService
            .emit<string, any>('patient-created', data)
            .subscribe((guid) => {
              console.log('published message with guid:', guid);
            });

    return patient
    
  }

  findAll() {
    return `This action returns all patients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
