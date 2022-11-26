import React, { useEffect, useState } from "react";
import { Student } from "../../interfaces/Student";

const CreateModal: React.FC<{
    active: boolean,
    handleActiveModal: () => void
}> = ({ active, handleActiveModal }) => {
    const [student, setStudent] = useState({ id: 0, ra: 0, name: "", email: "", school: 0, telephone: "" });

    useEffect(() => {
    }, [])

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
                                    <label className="label" htmlFor="name">Nome do Aluno</label>
                                    <input id="name" className="input"
                                        type="text" value={student.name} placeholder="Nome do Aluno"
                                        onChange={handleName}
                                    />
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateModal;