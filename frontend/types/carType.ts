
import { Float } from 'react-native/Libraries/Types/CodegenTypes'

export interface CarCardProps {
    id: number;
    name: string;
    description: string;
    rating: Float;
    image: string;
}

export interface CarType {
    id: number;
    car_name: string;
    description: string;
    rating: Float;
}

