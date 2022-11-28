import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Restriction } from "../../interfaces/restriction";
import { getOneWithECsById, getUserById } from "../../services/Student";
import RestrictionComponent from "../Restriction/Restriction";
import RestrictionDetailsModal from "../RestrictionDetailsModal/RestrictionDetailsModal";
import RestrictionCreateModal from "../RestrictionCreateModal/RestrictionCreateModal";
import './HomeStudent.css';

function HomeStudent() {
    const queryParams = new URLSearchParams(useLocation().search);
    const [student, setStudent] = useState({ id: 0, ra: 0, name: "", email: "", school_id: 0, telephone: "" });
    const [ecs, setEcs] = useState<Restriction[]>();
    const [restrictionId, setRestrictionId] = useState<Number>();
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [activeCreateModal, setActiveCreateModal] = useState<boolean>(false);

    const handleActiveModal = async () => {
        setActiveModal(!activeModal);
    }

    const handleActiveCreateModal = () => {
        setActiveCreateModal(!activeCreateModal);
    }

    const handleRestrictionId = (id: Number) => {
        setRestrictionId(id);
    }
    useEffect(() => {

        const getData = async () => {
            setIsLoading(true);
            const std = await getUserById(Number(queryParams.get('id')));
            if (std) {
                setStudent(std[0]);
            }
            const ecs = await getOneWithECsById(Number(queryParams.get('id')));
            if (ecs) {
                setEcs(ecs[`${std[0].ra}`]);
            }
            setIsLoading(false);
        }

        getData();

    }, []);

    const renderRestrictions = () => {
        return ecs?.map(ec => {
            return <RestrictionComponent key={ec.id.toString()} restriction={ec}
                handleActiveModal={handleActiveModal} handleRestrictionId={handleRestrictionId} />
        });
    }

    return (
        <div>


            <div>
                <RestrictionDetailsModal handleActiveModal={handleActiveModal}
                    active={activeModal} restrictionId={restrictionId} />

                <RestrictionCreateModal handleActiveModal={handleActiveCreateModal}
                    active={activeCreateModal} studentId={student.id} />

                <section className='section'>
                    <div className="container">
                        <div className="columns is-centered is-vcentered">
                            <div className="column">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="table-container">
                                            <div className="container">
                                                {/* CABEÇALHO COMEÇO */}
                                                <div className="card-stacked">
                                                    <div className="card-content">
                                                        <div className="media-content">
                                                            <p className="subtitle is-5">
                                                                Nome: <strong>{student.name}</strong><br />
                                                                Email: <strong>{student.email}</strong><br />
                                                                Telefone: <strong>{student.telephone}</strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* CABEÇALHO FIM*/}
                                            <table className="table is-bordered is-hoverable is-selected">
                                                <thead>
                                                    <tr>
                                                        <th>Resumo</th>
                                                        <th>
                                                            <button
                                                                className="button 
                                                                is-light is-success"
                                                                onClick={handleActiveCreateModal}>
                                                                Adicionar Restrição
                                                            </button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderRestrictions()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
}

export default HomeStudent