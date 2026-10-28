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

  async findAll() {
    return await this.patientRepository.find();
  }

  async findOne(id: string) {
    const patient = await this.patientRepository.createQueryBuilder('patient')
                    .where('patient.id =:id', {id: id})
                    .getOne();
    if(!patient)
      throw new HttpException(`Ce patient n'existe pas encore dans le système !`, HttpStatus.NOT_FOUND);
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    await this.findOne(id);
    await this.patientRepository.update(id, updatePatientDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const patient = await this.findOne(id);
    await this.patientRepository.remove(patient);
    return patient;
  }
}
