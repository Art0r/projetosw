import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStudentByRa } from '../../services/Student';
import './Login.css';

const LoginUser: React.FC<{ handleLoginType: () => void }> = ({ handleLoginType }) => {
    const queryParams = new URLSearchParams(useLocation().search);
    const [ra, setRa] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [validStudent, setValidStudent] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleRa = (e: any) => {
        setRa(e.target.value);
    }

    const handlePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const validateStudent = async () => {
        const student = await getStudentByRa(ra);
        if (student) {
            if (student.password == password) {
                setValidStudent(true);
                navigate(`/?id=${student.school_id}`)
                return;
            }
            setValidStudent(false);
            return;
        }
        setValidStudent(false);
        return;
    }

    return (
        <section className='section'>
            <div className="container">
                <div className="columns is-centered is-vcentered">
                    <div className="column is-half">
                        <div className="card" onClick={() => setValidStudent(true)}>
                            <div className="card-content">
                                <h1 className='title is-3 has-text-centered'>Login do Usuário
                                    <button className='button is-info ml-1'
                                        onClick={handleLoginType}>Mudar o Tipo de Login</button></h1>

                                <hr />
                                {!validStudent &&
                                    <article className="message is-danger">
                                        <div className="message-body">
                                            <strong>RA ou senha inválidos</strong>
                                        </div>
                                    </article>
                                }
                                <div className="field">
                                    <label className="label">RA</label>
                                    <div className="control">
                                        <input className="input" type="text"
                                            placeholder="1234567"
                                            onChange={handleRa} />
                                    </div>
                                    <p className="help">O RA é composto apenas por números</p>
                                </div>
                                <div className="field">
                                    <label className="label">Senha</label>
                                    <div className="control">
                                        <input className="input" type="password"
                                            placeholder="**********"
                                            onChange={handlePassword} />
                                    </div>
                                </div>
                                <button className='button is-success'
                                    onClick={validateStudent}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section>

    );
}

export default LoginUser;