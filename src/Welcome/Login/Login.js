import React, { useState } from 'react';
import './Login.scss'
import Welcome from '../Welcome';
import {  Field, Form, Formik } from 'formik';
import { BiUser, BiLockAlt } from 'react-icons/bi';
import {loginSchema} from './login.schema'
import { Link,useHistory } from 'react-router-dom';



function Login() {
    const initialValues = {username:'',password:''};
    const [showError, setShowError]= useState(false);
    const history = useHistory();


    function submit(values) {
        fetch ('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            if (res.status === 200) {
                history.push('/');
                return
            }
            setShowError(true);
        });
    }    

    return (
        <Welcome>
                <div className="formBox container">
                <h4>Login</h4>
                {showError && <div className="alert alert-danger">
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

                        <div className="mb-3 input-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text"><BiLockAlt /></span>
                                <Field type="password" name="password"className="form-control" id="password" placeholder="Password"/>
                            </div>
                        </div>
                        <div className="mb-4 d-grid col-6 mx-auto">
                            <button type="submit" className="btn btn-register">Login</button>
                        </div>
                    </Form>
                </Formik>
                <p className="formOptions">Create your account <Link to="/register">here</Link></p>    
            </div>
        </Welcome>
    );
}

export default Login;