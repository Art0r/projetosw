import React, { useEffect, useState } from "react";
import { Restriction } from "../../interfaces/restriction";
import { Student } from "../../interfaces/Student";
import { deleteOneById, getOneWithECsById, getUserById, updateOneById } from "../../services/Student";

const DetailsModal: React.FC<{
    studentRa: String, studentId: Number | undefined, active: boolean,
    handleActiveModal: () => void
}> = ({ studentRa, studentId, active, handleActiveModal }) => {
    const [student, setStudent] = useState<Student>({ id: 0, ra: "", name: "", email: "", school_id: 0, telephone: "", password: "" });
    const [restrictions, setRestrictions] = useState<Restriction[]>();

    useEffect(() => {
        if (active) {
            const getData = async () => {
                const student = await getUserById(studentId);
                if (student) {
                    setStudent(student[0]);
                }
                const rest = await getOneWithECsById(studentId);
                setRestrictions(rest[`${studentRa}`]);
            }

            getData();
        }

    }, [handleActiveModal]);

    const handleName = (e: any) => {
        setStudent({
            ...student,
            ...{ name: e.target.value }
        });
    }

    const handleEmail = (e: any) => {
        setStudent({
            ...student,
            ...{ email: e.target.value }
        });
    }

    const handleTelephone = (e: any) => {
        setStudent({
            ...student,
            ...{ telephone: e.target.value }
        });
    }

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
                                        <label className="label" htmlFor="name">Nome do Aluno</label>
                                        <input id="name" className="input"
                                            type="text" value={student.name}
                                            placeholder="Nome do Aluno"
                                            onChange={handleName}
                                        />
                                    </div>
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="name">RA do Aluno</label>
                                        <input id="name" className="input" readOnly
                                            type="text" value={student.ra}
                                            placeholder="RA do aluno"
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="field-group">
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="email">Email do Responsável</label>
                                        <input id="email" className="input"
                                            type="email" value={student.email}
                                            placeholder="Email do Responsável"
                                            onChange={handleEmail}
                                        />
                                    </div>
                                    <div className="field is-inline-block-desktop">
                                        <label className="label" htmlFor="telephone">Telefone do Responsável</label>
                                        <input id="telephone" className="input" readOnly
                                            type="number" value={student.telephone}
                                            placeholder="Telefone do Responsável"
                                            onChange={handleTelephone}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="buttons">
                                    <button className="button is-light is-danger"
                                        onClick={() => deleteOneById(studentId)
                                            .then(() => handleActiveModal)}>Deletar</button>
                                    <button className="button is-light is-warning"
                                        onClick={() => updateOneById(student)
                                            .then(() => handleActiveModal)}>Editar</button>
                                </div>
                                <hr />
                                <h1 className="title is-3">Restrições</h1>
                                {restrictions?.map(restriction => {
                                    return <div key={restriction.id.toString()}>
                                        <div className="field-group">
                                            <label className="label" htmlFor="title">Resumo</label>
                                            <textarea id="title" className="textarea"
                                                rows={2} cols={50}
                                                value={restriction?.title}
                                                placeholder="Resumo" readOnly>
                                            </textarea>
                                            <br />
                                        </div>
                                        <div className="field-group">
                                            <label className="label" htmlFor="description">Descrição
                                            </label>
                                            <textarea id="description" className="textarea"
                                                rows={7} cols={50}
                                                value={restriction?.description}
                                                placeholder="Descrição" readOnly>
                                            </textarea>
                                        </div>
                                        <hr />
                                    </div>
                                })}
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