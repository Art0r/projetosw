import React, { useEffect, useState } from "react";
import { Restriction } from "../../interfaces/restriction";
import { createOne } from "../../services/Restriction";

const RestrictionCreateModal: React.FC<{
    active: boolean,
    handleActiveModal: () => void,
    studentId: Number
}> = ({ active, handleActiveModal, studentId }) => {
    const [restriction, setRestriction] = useState<Restriction>({ id: 0, title: "", description: "", student_id: 0 });

    useEffect(() => {
    }, [])

    const handleTitle = (e: any) => {
        setRestriction({
            ...restriction,
            ...{ title: e.target.value }
        })
    }

    const handleDescription = (e: any) => {
        setRestriction({
            ...restriction,
            ...{ description: e.target.value }
        })
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
                                    <label className="label" htmlFor="title">Resumo</label>
                                    <textarea id="title" className="textarea"
                                        rows={2} cols={50}
                                        value={restriction?.title}
                                        placeholder="Resumo"
                                        onChange={handleTitle}>
                                    </textarea>

                                </div>
                                <hr />
                                <div className="field-group">
                                    <label className="label" htmlFor="description">Descrição
                                    </label>
                                    <textarea id="description" className="textarea"
                                        rows={7} cols={50}
                                        value={restriction?.description}
                                        placeholder="Descrição"
                                        onChange={handleDescription}>
                                    </textarea>
                                </div>
                            </div>
                            <hr />
                            <div className="buttons">
                                <button className="button is-ghost"
                                    onClick={(handleActiveModal)}>Cancelar</button>
                                <button className="button is-light is-success"
                                    onClick={() => createOne(restriction.title,
                                        restriction.description, studentId).then(() =>
                                            handleActiveModal()
                                        )}>Criar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default RestrictionCreateModal;