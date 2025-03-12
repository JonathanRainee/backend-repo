export interface User{
    name: string;
    email: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    password: string;
}

export interface UserData {
    email: string;
    password: string;
    age: number;
    name: string;
  }