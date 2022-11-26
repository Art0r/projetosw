import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSchoolByEmail } from '../../services/School';
import './Login.css';

const LoginInst: React.FC<{ handleLoginType: () => void }> = ({ handleLoginType }) => {
    const queryParams = new URLSearchParams(useLocation().search);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [validSchool, setValidSchool] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const validateSchool = async () => {
        const school = await getSchoolByEmail(email)
        if (school) {
            if (school.password == password) {
                setValidSchool(true);
                navigate(`/school?id=${school.id}`)
                return;
            }
            setValidSchool(false);
            return;
        }
        setValidSchool(false);
        return;
    }

    return (
        <section className='section'>
            <div className="container">
                <div className="columns is-centered is-vcentered">
                    <div className="column is-half">
                        <div className="card" onClick={() => setValidSchool(true)}>
                            <div className="card-content">
                                <h1 className='title is-3 has-text-centered'>Login da Instituição
                                    <button className='button is-info ml-1'
                                        onClick={handleLoginType}>Mudar o Tipo de Login</button></h1>
                                <hr />
                                {!validSchool &&
                                    <article className="message is-danger">
                                        <div className="message-body">
                                            <strong>Email ou senha inválidos</strong>
                                        </div>
                                    </article>
                                }
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input className="input" type="email"
                                            placeholder="user@example.com"
                                            onChange={handleEmail} />
                                    </div>
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
                                    onClick={validateSchool}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section>

    );
}

export default LoginInst;