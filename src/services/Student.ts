import { Student } from '../interfaces/Student';
import { STUDENTS } from './mock-users';

const getUsers = (): Student[] => {
    return STUDENTS;
}

const getUsersByIds = (ras: Number[]): Student[] => {
    let users: Student[] = [];
    getUsers().forEach(user => {
        if (ras.indexOf(user.ra) !== -1) {
            users.push(user);
        }
    });
    return users;
}

const getUserById = async (id: Number | undefined) => {
    const response = await fetch(`http://localhost:5000/students?id=${id}`)
    const data = await response.json();
    if (response.status == 200) {
        return data;
    }
    return false;
}

const getStudentByRa = async (ra: String | undefined) => {
    const response = await fetch(`http://localhost:5000/students?ra=${ra}`);
    const data = await response.json();
    if (response.status == 200) {
        return data[0];
    }
    return false;
}

const createUser = (user: Student) => {
    STUDENTS.push(user);
    return getUsers()
}

export { getUsers, getUserById, getUsersByIds, createUser, getStudentByRa }