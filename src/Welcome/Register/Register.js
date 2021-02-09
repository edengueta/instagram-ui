import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { BiUser, BiLockAlt, BiAt } from 'react-icons/bi';
import {registerSchema} from './register.schema'
import Welcome from '../Welcome';
import { Link, useHistory } from 'react-router-dom';


function Register() {
    const initialValues = {username:'',email:'',password:'',agreeToTerms:false};

    const history = useHistory();

    function submit(values) {
        fetch ('http://localhost:4000/user', {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            if (res.status === 201) {
                history.push('/login');
                return
            }
            console.log ('Failure');
        });
    }    

    return (
        <Welcome>
            <div className="formBox container">
                <h4>Sign up to see photos and videos from your friends.</h4>
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit ={submit}>
                    <Form className="Form row">
                        <div className="mb-3 input-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <div className="input-group">
                                <span className="input-group-text"><BiUser /></span>
                                <Field type="text" name="username" className="form-control" id="username" placeholder="Username"/>
                            </div>
                            <ErrorMessage className="ErrorMessage" name="username" component="span"/>
                        </div>

                        <div className="mb-3 input-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text"><BiLockAlt /></span>
                                <Field type="password" name="password"className="form-control" id="password" placeholder="Password"/>
                            </div>
                            <ErrorMessage className="ErrorMessage" name="password" component="span"/>
                        </div>
                        
                        <div className="mb-3 input-group">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <div className="input-group">
                                <span className="input-group-text"><BiAt /></span>
                                <Field type="email" name="email" className="form-control" id="email" placeholder="name@example.com"/>
                            </div>
                            <ErrorMessage className="ErrorMessage" name="email" component="span"/>
                        </div>

                        <div className="mb-4 d-grid col-6 mx-auto">
                            <button type="submit" className="btn">Register</button>
                        </div>
                    </Form>
                </Formik>
            <p className="formOptions">Already registered? <Link to="/login">Login</Link></p>
            </div>
            </Welcome>
    );
}

export default Register;