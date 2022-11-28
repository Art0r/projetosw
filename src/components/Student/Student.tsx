import React from "react";
import { Student } from "../../interfaces/Student";

const StudentComponent: React.FC<{
    student: Student, handleActiveModal: () => void,
    handleStudentRa: (ra: String) => void, handleStudentId: (id: Number) => void,
}> = ({ student, handleActiveModal, handleStudentRa, handleStudentId }) => {

    const handleClick = (e: any) => {
        e.preventDefault();
        handleStudentId(student.id);
        handleStudentRa(student.ra);
        handleActiveModal();
    }

    return <tr key={student?.ra}>
        <th>{student?.ra}</th>
        <td>{student?.name}</td>
        <td>{student?.email}</td>
        <td>{student?.telephone}</td>
        <td>
            <button className="button is-light is-info"
                onClick={handleClick}>
                Mais Informações
            </button>
        </td>
    </tr>;
}

export default StudentComponent;