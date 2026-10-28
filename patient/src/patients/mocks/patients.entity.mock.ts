import { patientsDataMock } from "./patients.data.mock";

export const PatientsEntityMock = {
    find: jest.fn().mockResolvedValue(patientsDataMock),
};