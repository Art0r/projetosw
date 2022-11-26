import React from "react";
import { Student } from "../../interfaces/Student";

const StudentComponent: React.FC<{ student: Student, handleActiveModal: () => void, handleStudentId: (id: Number) => void }> = ({ student, handleActiveModal, handleStudentId }) => {

    const handleClick = (e: any) => {
        e.preventDefault();
        handleStudentId(student.id);
        handleActiveModal();
    }

    return <tr key={student?.ra}>
        <th>{student?.ra}</th>
        <td>{student?.name}</td>
        <td>{student?.email}</td>
        <td>{student?.telephone}</td>
        <td>
            <button className="button is-info"
                onClick={handleClick}>
                Mais Informações
            </button>
        </td>
    </tr>;
}

export default StudentComponent;