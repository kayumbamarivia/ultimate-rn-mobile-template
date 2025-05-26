export interface Car {
    id: number;
    name: string;
    description: string;
    rating: number;
    image: string;
}

export const cars: Car[] = [
    {
        id: 1,
        name: "Tesla Model S",
        description: "Luxury EV Sedan",
        rating: 4.8,
        image: "@/assets/images/car6.png"
    },
    {
        id: 2,
        name: "BMW M4",
        description: "Sport Coupe",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1617654112368-307921291f42"
    },
    {
        id: 3,
        name: "Porsche 911",
        description: "Classic Sport",
        rating: 4.9,
        image: "@/assets/images/car6.png"
    },
    {
        id: 4,
        name: "Audi RS7",
        description: "Premium Speed",
        rating: 4.7,
        image: "@/assets/images/car6.png"
    },
    {
        id: 5,
        name: "Mercedes AMG",
        description: "Luxury Power",
        rating: 4.5,
        image: "@/assets/images/car6.png"
    }
];