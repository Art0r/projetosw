import React, { useEffect, useState } from "react";
import { Restriction } from "../../interfaces/restriction";
import { getOneById } from "../../services/Restriction";
import { deleteOneById, updateById } from "../../services/Restriction";

const RestrictionDetailsModal: React.FC<{
    restrictionId: Number | undefined, active: boolean,
    handleActiveModal: () => void
}> = ({ restrictionId, active, handleActiveModal }) => {
    const [restriction, setRestriction] = useState<Restriction>({ id: 0, title: "", description: "", student_id: 0 });

    useEffect(() => {


        if (active) {
            const getData = async () => {
                const restrict = await getOneById(restrictionId);
                if (restrict) {
                    setRestriction(restrict[0]);
                }
            }

            getData();

        }

    }, [handleActiveModal])

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
                                <button className="button is-light is-danger"
                                    onClick={() => deleteOneById(restrictionId).then(() => handleActiveModal)
                                        .catch(() => handleActiveModal)}>Deletar</button>
                                <button className="button is-light is-warning"
                                    onClick={() => updateById(restriction).then(() => handleActiveModal)
                                        .catch(() => handleActiveModal)}>Editar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default RestrictionDetailsModal;