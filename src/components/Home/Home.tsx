import { useEffect, useState } from 'react';
import './Home.css';
import { Student } from '../../interfaces/Student';
import { useLocation } from 'react-router-dom';
import { getSchoolAndStudents, getSchoolById } from '../../services/School';
import { School } from '../../interfaces/School';
import DetailsModal from '../DetailsModal/DetailsModal';
import { getUserById } from '../../services/Student';
import StudentComponent from '../Student/Student';
import CreateModal from '../CreateModal/CreateModal';

function Home() {
  const queryParams = new URLSearchParams(useLocation().search);
  const [students, setStudents] = useState<Student[]>();
  const [studentId, setStudentId] = useState<Number>(0);
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


  const renderStudents = () => {
    return students?.map(student => {
      return <StudentComponent key={student.id} student={student} handleActiveModal={handleActiveModal} handleStudentId={handleStudentId} />
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
        handleActiveModal={handleActiveModal}
      />

      <CreateModal active={activeCreateModal} handleActiveModal={handleActiveCreateModal} />

      <div className="table-container">
        <h1 className='title is-1 has-text-centered'>{school?.name}</h1>
        <table className="table is-bordered is-hoverable is-selected is-fullwidth">
          <thead>
            <tr>
              <th>RA</th>
              <th>Nome</th>
              <th>Email do Responsável</th>
              <th>Telefone do Responsável</th>
              <th><button className='button is-success'
                onClick={handleActiveCreateModal}
              >Cadastrar Aluno</button></th>
            </tr>
          </thead>
          <tbody>
            {renderStudents()}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default Home;
