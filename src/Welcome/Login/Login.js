import React, { useContext, useState } from 'react';
import {  Field, Form, Formik } from 'formik';
import { BiUser, BiLockAlt, BiHide, BiShow  } from 'react-icons/bi';
import Cookies from 'js-cookie';
import { Link,useHistory } from 'react-router-dom';

import {loginSchema} from './login.schema'
import Welcome from '../Welcome'; 
import './Login.scss'
import logo from '../images/logo-circle.svg';
import { UserService } from '../../services/user.service';
import { UserContext } from '../../user-context';


function Login() {
    const initialValues = {username:'',password:''};
    const [showError, setShowError]= useState(false);
    const [showPass, setShowPass]= useState(false);
    const {setUser} = useContext(UserContext);
    const history = useHistory();

    const toggle = {
        show : ()=> setShowPass(true),
        hide : ()=> setShowPass(false),
    }

    async function submit(values) {
		setShowError(false);

		const res = await UserService.login(values);
        if (res.status !== 200) {
            setShowError(true);
            return;
        }

        const json = await res.json();
        Cookies.set('insta-user', json.token, { expires: 30 });

        const user = await UserService.me();
        setUser(user);
        history.push('/');
	}
  

    return (
        <Welcome>
                <div className="form-box mx-auto">
                    <div className='logo-wrapper mx-auto'>
                        <img src={logo} alt="logo-insta" className="logo "/>
                        <h4>Login</h4>        
                    </div>
                    {showError &&
                    <div className="alert alert-danger">
                        Incorrect username or password
                    </div> }
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit ={submit}>
                    <Form className="Form row">
                        <div className="mb-3 input-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <div className="input-group">
                                <span className="input-group-text"><BiUser /></span>
                                <Field type="text" name="username" className="form-control" id="username" placeholder="Username"/>
                            </div>
                        </div>

                        <div className="mb-3 input-group toggleParent">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text"><BiLockAlt /></span>
                                <Field type={!showPass ? "password" :"text"} name="password"className="form-control" id="password" placeholder="Password"/>
                            </div>
                            <span onPointerDown={toggle.show} onPointerUp={toggle.hide} onPointerLeave={toggle.hide} className="passwordToggle">
                                {!showPass ? <BiShow />:<BiHide />}
                            </span>
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="btn d-grid col-6 mx-auto">Login</button>
                        </div>
                    </Form>
                </Formik>
                <p className="formOptions">Create your account <Link to="/register">here</Link></p>    
            </div>
        </Welcome>
    );
}

export default Login;