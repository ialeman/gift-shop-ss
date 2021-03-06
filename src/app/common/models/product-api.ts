import { Rating } from './rating-api';

export interface ProductApi {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}