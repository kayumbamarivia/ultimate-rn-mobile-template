import { mockAPI } from './mockApi';
import { CarType } from '@/types/carType';
// Create a new car
export const createCar = async (car: Omit<CarType, 'id'>): Promise<CarType> => {
  const response = await mockAPI.post<CarType>('/car', car);
  return response.data;
};
// Get all cars
export const getCars = async (): Promise<CarType[]> => {
  const response = await mockAPI.get<CarType[]>('/car');
  return response.data;
};
// Get a single car
export const getCar = async (id: number): Promise<CarType> => {
  const response = await mockAPI.get<CarType>(`/car/${id}`);
  return response.data;
};
// Update a car
export const updateCar = async (car: CarType): Promise<CarType> => {
  const response = await mockAPI.put<CarType>(`/car/${car.id}`, car);
  return response.data;
};
// Delete a car
export const deleteCar = async (id: number): Promise<void> => {
  await mockAPI.delete(`/cars/${id}`);
};