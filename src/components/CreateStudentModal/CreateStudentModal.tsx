import React, { useEffect, useState } from "react";
import { Restriction } from "../../interfaces/restriction";
import { Student } from "../../interfaces/Student";
import { createStudent } from "../../services/Student";

const CreateModal: React.FC<{
    active: boolean,
    handleActiveModal: () => void,
    schoolId: Number,
    handleSendingMail: () => void,
    sendingMail: boolean,
}> = ({ active, handleActiveModal, handleSendingMail, schoolId, sendingMail }) => {
    const [student, setStudent] = useState<Student>({ id: 0, ra: "", name: "", email: "", school_id: 0, telephone: "" });

    useEffect(() => {
    }, [])

    const handleRa = (e: any) => {
        setStudent({
            ...student,
            ...{ ra: e.target.value }
        });
    }

    const handleName = (e: any) => {
        setStudent({
            ...student,
            ...{ name: e.target.value }
        })
    }

    const handleEmail = (e: any) => {
        setStudent({
            ...student,
            ...{ email: e.target.value }
        })
    }


    const handleTelephone = (e: any) => {
        setStudent({
            ...student,
            ...{ telephone: e.target.value }
        })
    }


    return (
        <div className="container">
            <div className={active ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={(handleActiveModal)}></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                <div className="field-group">
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="name">Nome do Aluno</label>
                                        <input id="name" className="input"
                                            type="text" value={student.name} placeholder="Nome do Aluno"
                                            onChange={handleName}
                                        />
                                    </div>
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="ra">RA do Aluno</label>
                                        <input id="ra" className="input"
                                            type="text" value={student.ra} placeholder="RA do Aluno"
                                            onChange={handleRa}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="field-group">
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="email">Email do Responsável</label>
                                        <input id="email" className="input"
                                            type="email" value={student.email} placeholder="Email do Responsável"
                                            onChange={handleEmail}
                                        />
                                    </div>
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="telephone">Telefone do Responsável</label>
                                        <input id="telephone" className="input"
                                            type="text" value={student.telephone} placeholder="Telefone do Responsável"
                                            onChange={handleTelephone}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="buttons">
                                    <button className="button is-ghost"
                                        onClick={(handleActiveModal)}>Cancelar</button>
                                    <button className="button is-light is-primary" disabled={sendingMail}
                                        onClick={() => createStudent(student, schoolId, handleSendingMail)
                                            .then(() => handleActiveModal)}>Criar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CreateModal;