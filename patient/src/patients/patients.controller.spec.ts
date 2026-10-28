import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PatientsServiceMock } from './mocks/patients.service.mock';
import { patientsDataMock } from './mocks/patients.data.mock';
import { createPatientDto } from './mocks/patients.data.create.dto.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { updatePatientDto } from './mocks/patients.data.update.dto.mock';

describe('PatientsController', () => {
  let controller: PatientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
                  {
                    provide: PatientsService,
                    useClass: PatientsServiceMock
                  },
                ],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () =>{
    it('sould return an array of patients', () => {
      const result = controller.findAll();
      expect(result)
      .resolves
      .toEqual(patientsDataMock);
      console.log('Patients récupérés avec succès:', result);
    });
  });

  describe('findOne', () =>{
      it('should return a detail of one patient', () => {
        const id = `a3e4c5d6-8a7b-4c20-a8f9-987654321def`;
        const patient = patientsDataMock.find(patient => patient.id === id);
        expect(controller.findOne(id))
        .toEqual(patient);
        console.log('Patient récupéré avec succès:', patient);
      });
  });

  describe('create', () =>{
    it('should return a patient created !', () => {
      try {
        const result =  controller.create(createPatientDto);
        expect(result).toEqual(expect.objectContaining(createPatientDto));
        console.log('Patient créé avec succès:', result);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('Email already exists');
        console.log('Erreur capturée:', error.message);
      }  
    });
  });

  describe('update', () =>{
    it('should return an updated patient !', () =>{
      const id = `a3e4c5d6-8a7b-4c20-a8f9-987654321def`;
      const result =  controller.update(id, updatePatientDto);
      expect(result).toEqual(expect.objectContaining({id, ...updatePatientDto}));
      console.log('Patient modifié avec succès:', result);
    });
  });

  describe('remove', () =>{
    it('should delete one patient by its id', () =>{
      const id: string = `a3e4c5d6-8a7b-4c20-a8f9-987654321def`;
      const result =  controller.remove(id);
      expect(result).toEqual(expect.objectContaining({id}));
      console.log('Patient supprimé avec succès:', result);
    });
  });

});