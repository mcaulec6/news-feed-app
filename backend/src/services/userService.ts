import { User } from '../models/Users';
import { randomUUID } from 'crypto';

const users: User[] = [];

export function createUser(email: string, passwordHash: string): User {
    const user: User = {
        id: randomUUID(),
        email,
        passwordHash,
        keywords: []
    };
    users.push(user);
    return user;
}

export function findUserByEmail(email: string): User | undefined {
    return users.find(user => user.email === email);
}

export function findUserById(id: string): User | undefined {
    return users.find(user => user.id === id);
}