import { useEffect, useState } from 'react';
import { Student } from '../../interfaces/Student';
import { useLocation } from 'react-router-dom';
import { getSchoolAndStudents, getSchoolById } from '../../services/School';
import { School } from '../../interfaces/School';
import DetailsModal from '../DetailsModal/DetailsModal';
import StudentComponent from '../Student/Student';
import CreateModal from '../CreateModal/CreateModal';
import './HomeSchool.css';

function HomeSchool() {
  const queryParams = new URLSearchParams(useLocation().search);
  const [students, setStudents] = useState<Student[]>();
  const [studentId, setStudentId] = useState<Number>(0);
  const [studentRa, setStudentRa] = useState<String>("");
  const [school, setSchool] = useState<School>();
  const [activeModal, setActiveModal] = useState(false);
  const [activeCreateModal, setActiveCreateModal] = useState(false);

  const handleActiveModal = async () => {
    setActiveModal(!activeModal);
  }

  const handleActiveCreateModal = () => {
    setActiveCreateModal(!activeCreateModal);
  }

  const handleStudentId = (id: Number) => {
    setStudentId(id);
  }

  const handleStudentRa = (ra: String) => {
    setStudentRa(ra);
  }


  const renderStudents = () => {
    return students?.map(student => {
      return <StudentComponent key={student.id} student={student} handleStudentRa={handleStudentRa}
        handleActiveModal={handleActiveModal} handleStudentId={handleStudentId} />
    });
  }

  useEffect(() => {

    const getData = async () => {
      const school = await getSchoolById(Number(queryParams.get('id')));
      setSchool(school[0])
      const students = await getSchoolAndStudents(Number(queryParams.get('id')), school[0].name);
      setStudents(students);
    }

    getData();

  }, []);

  return (
    <div className="App">

      <DetailsModal studentId={studentId} active={activeModal}
        studentRa={studentRa} handleActiveModal={handleActiveModal}
      />

      <CreateModal active={activeCreateModal} handleActiveModal={handleActiveCreateModal} schoolId={school?.id} />

      <section className='section'>
        <div className="container">
          <div className="columns is-centered is-vcentered">
            <div className="column">
              <div className="card">
                <div className="card-content">
                  <div className="table-container">
                    <h1 className='title is-1 has-text-centered'>{school?.name}</h1>
                    <table className="table is-bordered is-hoverable is-selected is-fullwidth">
                      <thead>
                        <tr>
                          <th>RA</th>
                          <th>Nome</th>
                          <th>Email do Responsável</th>
                          <th>Telefone do Responsável</th>
                          <th><button className='button is-light is-success'
                            onClick={handleActiveCreateModal}
                          >Cadastrar Aluno</button></th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderStudents()}
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
  );
}

export default HomeSchool;