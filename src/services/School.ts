import { SCHOOLS } from "./mock-schools";
import { School } from "../interfaces/School";

const getSchoolAndStudents = async (id: Number, school_name: string) => {
    const response = await fetch(`http://localhost:5000/schools?id=${id}`,
        { method: 'GET' });
    const data = await response.json();
    if (response.status == 200) {
        return data[`${school_name}`];
    }

    return false;
}

const getSchoolById = async (id: Number) => {
    const response = await fetch(`http://localhost:5000/schools?school=${id}`)
    const data = await response.json();
    if (response.status == 200) {
        return data;
    }

    return false;
}

const getSchoolByEmail = async (email: String | undefined) => {
    const response = await fetch(`http://localhost:5000/schools?email=${email}`)
    const data = await response.json();
    if (response.status == 200) {
        return data[0];
    }

    return false;
}

export { getSchoolAndStudents, getSchoolById, getSchoolByEmail }