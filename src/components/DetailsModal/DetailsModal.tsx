import React, { useEffect, useState } from "react";
import { getUserById } from "../../services/Student";

const DetailsModal: React.FC<{
    studentId: Number | undefined, active: boolean,
    handleActiveModal: () => void
}> = ({ studentId, active, handleActiveModal }) => {
    const [student, setStudent] = useState({ id: 0, ra: 0, name: "", email: "", school: 0, telephone: "" });

    useEffect(() => {


        if (active) {
            const getData = async () => {
                const student = await getUserById(studentId);
                if (student) {
                    setStudent(student[0]);
                }
            }

            getData();

        }

    }, [handleActiveModal])

    return (
        <div className="container">
            <div className={active ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={handleActiveModal}></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                <div className="field-group">
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="ra">RA do Aluno</label>
                                        <input id="name" className="input" readOnly
                                            type="text" value={student.ra} placeholder="RA do Aluno"
                                        />
                                    </div>
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="name">Nome do Aluno</label>
                                        <input id="name" className="input" readOnly
                                            type="text" value={student.name} placeholder="Nome do Aluno"
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="field-group">
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="email">Email do Responsável</label>
                                        <input id="email" className="input" readOnly
                                            type="email" value={student.email} placeholder="Email do Responsável"
                                        />
                                    </div>
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="telephone">Telefone do Responsável</label>
                                        <input id="telephone" className="input" readOnly
                                            type="number" value={student.telephone} placeholder="Telefone do Responsável"
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="buttons">
                                    <button className="button is-ghost"
                                        onClick={(handleActiveModal)}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default DetailsModal;