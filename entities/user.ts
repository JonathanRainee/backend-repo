export interface User{
    name: string;
    email: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    password: string;
}