import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCar, getCars, getCar, updateCar, deleteCar } from '@/api/carCrud';
import { CarType } from '@/types/carType';
export const useGetCars = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });
};
export const useGetCar = (id: number) => {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => getCar(id),
  });
};
export const useCreateCar = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: (newCar: Omit<CarType, 'id'>) => createCar(newCar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};
export const useUpdateCar = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: updateCar,
    onSuccess: (updatedCar) => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      queryClient.invalidateQueries({ queryKey: ['car', updatedCar.id] });
    },
  });
};
export const useDeleteCar = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};