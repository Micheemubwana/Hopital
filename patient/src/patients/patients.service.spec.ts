import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';
import { PatientsEntityMock } from './mocks/patients.entity.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NatsStreamingMock } from './mocks/nats-streaming.mock';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { patientsDataMock } from './mocks/patients.data.mock';
import { PatientsQueryBuilderMock } from './mocks/patients-queryBuilder.mock';
import { NotFoundException } from '@nestjs/common';

describe('PatientsService', () => {
  let service: PatientsService;
  let patients = [...patientsDataMock];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
                  PatientsService,
                  {
                    provide: getRepositoryToken(Patient),
                    useValue: PatientsEntityMock
                  },
                  {
                    provide: Publisher,
                    useValue: NatsStreamingMock,
                  },
                  {
                    provide: getRepositoryToken(Patient),
                    useValue: {
                      createQueryBuilder: jest.fn(() => PatientsQueryBuilderMock),
                    },
                  },
                ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () =>{
    it('should return all patients !', () =>{
      expect(service.findAll()).resolves.toEqual(patientsDataMock);
    });
  });

  describe('findOne', () =>{
    it('should return one patient by its id !', () =>{
      jest.spyOn(PatientsQueryBuilderMock, 'getOne')
      .mockImplementation(
                          (id: string) =>{
                                            const patient = patients.find(patient =>patient.id === id);
                                            if(!patient)
                                              throw new NotFoundException(`Ce patient n'existe pas encore dans ce système !`);
                                            return patient;
                                          }
                        );
      
      try {
          const id = `a3e4c5d6-8a7b-4c20-a8f9-987654321def`;
          const patient = patientsDataMock.find(patient => patient.id === id);
          const result =  service.findOne(id);
          expect(result).toEqual(patient);
          console.log('Patient récupéré avec succès:', result);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe('Patient introuvable !');
          console.log('Erreur capturée:', error.message);
        }
    });
  });

  describe('findAll', () =>{
    it('should return all patients !', () =>{});
  });

  describe('findAll', () =>{
    it('should return all patients !', () =>{});
  });

  describe('findAll', () =>{
    it('should return all patients !', () =>{});
  });

  describe('findAll', () =>{
    it('should return all patients !', () =>{});
  });
});
