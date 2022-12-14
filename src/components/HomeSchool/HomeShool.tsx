import { useEffect, useState } from 'react';
import { Student } from '../../interfaces/Student';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSchoolAndStudents, getSchoolById } from '../../services/School';
import { School } from '../../interfaces/School';
import DetailsStudentModal from '../DetailsStudentModal/DetailsStudentModal';
import StudentComponent from '../Student/Student';
import CreateStudentModal from '../CreateStudentModal/CreateStudentModal';
import './HomeSchool.css';
import { useCookies } from 'react-cookie';

function HomeSchool() {
  const queryParams = new URLSearchParams(useLocation().search);
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState<Number>(0);
  const [studentRa, setStudentRa] = useState<String>("");
  const [school, setSchool] = useState<School>({ address: "", email: "", id: 0, name: "", telephone: "" });
  const [activeModal, setActiveModal] = useState(false);
  const [activeCreateModal, setActiveCreateModal] = useState(false);
  const [sendingMail, setSendingMail] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  const handleActiveModal = async () => {
    setActiveModal(!activeModal);
  }

  const handleSendingMail = () => {
    setSendingMail(!sendingMail);
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
    if (students.length <= 0) {
      return <tr>
        <td>
          <h1 className="title is-3">Nenhum aluno a ser exibido</h1>
        </td>
      </tr>;
    }

    return students?.map(student => {
      return <StudentComponent key={student.id} student={student} handleStudentRa={handleStudentRa}
        handleActiveModal={handleActiveModal} handleStudentId={handleStudentId} />
    });
  }

  useEffect(() => {

    const getData = async () => {
      const school = await getSchoolById(Number(queryParams.get('id')));
      if (school) {

        const stored_email = cookies['user'].split('!&$@#&')[0];
        const stored_password = cookies['user'].split('!&$@#&')[1];

        if (!(stored_password === school[0]["password"] && stored_email === school[0]["email"])) {
          navigate('/');
          return;
        }

        setSchool(school[0]);
        const students = await getSchoolAndStudents(Number(queryParams.get('id')), school[0].name);
        if (students) {
          setStudents(students);
        }
        return;
      }
      navigate('/');
      return;
    }

    getData();

  }, []);

  return (
    <div className="App">

      <DetailsStudentModal studentId={studentId} active={activeModal}
        studentRa={studentRa} handleActiveModal={handleActiveModal}
      />

      <CreateStudentModal active={activeCreateModal} handleActiveModal={handleActiveCreateModal}
        schoolId={school.id} handleSendingMail={handleSendingMail} sendingMail={sendingMail} />

      <section className='section'>
        <div className="container">
          <div className="columns is-centered is-vcentered">
            <div className="column">
              <div className="card">
                <div className="card-content">
                  <div className="table-container">
                    {/* CABE??ALHO COME??O */}
                    <div className="card-stacked">
                      <div className="card-content">
                        <div className="media-content">
                          <p className="subtitle is-5">
                            Nome: <strong>{school.name}</strong><br />
                            Email: <strong>{school.email}</strong><br />
                            Telefone: <strong>{school.telephone}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* CABE??ALHO FIM <h1 className='title is-1 has-text-centered'>{school?.name}</h1>*/}
                  {students?.length <= 0 ?
                    <table className="table">
                      <thead>
                        <tr>
                          <th><button className='button is-light is-success'
                            onClick={handleActiveCreateModal}
                          >Cadastrar Aluno</button></th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderStudents()}
                      </tbody>
                    </table>
                    :
                    <table className="table is-bordered is-hoverable is-selected is-fullwidth">
                      <thead>
                        <tr>
                          <th>RA</th>
                          <th>Nome</th>
                          <th>Email do Respons??vel</th>
                          <th>Telefone do Respons??vel</th>
                          <th><button className='button is-light is-success'
                            onClick={handleActiveCreateModal}
                          >Cadastrar Aluno</button></th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderStudents()}
                      </tbody>
                    </table>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
}

export default HomeSchool;
