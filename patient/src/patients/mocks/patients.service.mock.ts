import { ConflictException, NotFoundException } from "@nestjs/common";
import { patientsDataMock } from "./patients.data.mock";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { UpdatePatientDto } from "../dto/update-patient.dto";

let patients = [...patientsDataMock];

export class PatientsServiceMock {
  create = jest.fn().mockImplementation(
            (createPatientDto: CreatePatientDto) =>{
                                    const existingPatient = patients
                                                            .find(
                                                                    (patient) => patient.email === createPatientDto.email,
                                                                  );
                                    if (existingPatient) {
                                      throw new ConflictException('Email already exists');
                                    }
                                    const createdPatient = {
                                                              ...createPatientDto,
                                                              id: 'd1f5e8e0-7f4c-4d39-bd5c-123456789abc',
                                                              createdAt: new Date(),
                                                              updatedAt: new Date(),
                                                              deletedDate: null,
                                                            };

                                    patients.push(createdPatient);
                                    return createdPatient;
                                  }
            );

  findAll = jest.fn().mockResolvedValue(patients);

  findOne = jest.fn()
            .mockImplementation(
                                (id: string) =>{
                                                  return patients.find(patient =>patient.id === id);
                                                }
                              );

  update = jest.fn()
            .mockImplementation(
                                (
                                  id: string, 
                                  updateDto: UpdatePatientDto
                                )=>{
                                    const existingPatient = patients.find(patient => patient.id === id);
                                    if (existingPatient) {
                                      patients = patients.map(
                                                            (patient) =>
                                                              patient.id === id ? {...patient, ...updateDto} : patient
                                                          );
                                      return {...existingPatient, ...updateDto};
                                    }
                                })
    remove = jest.fn()
            .mockImplementation(
                                (id: string) =>{
                                                  const patient = patients.find(patient =>patient.id === id);
                                                  patients = patients.filter(patient => patient.id != id);
                                                  return patient;
                                                }
                              );
}
