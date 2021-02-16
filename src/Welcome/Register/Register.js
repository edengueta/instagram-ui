import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { BiUser, BiLockAlt, BiAt } from 'react-icons/bi';
import {registerSchema} from './register.schema'
import Welcome from '../Welcome';
import { Link, useHistory } from 'react-router-dom';
import { UserService } from '../../services/user.service';
import borat from '../borat_icon.svg';


function Register() {
    const initialValues = {username:'',email:'',password:'',agreeToTerms:false};
    const [showSuccess,setSuccess]= useState(false);
    const history = useHistory();

    async function submit(values) {
		const res = await UserService.create(values)
            if (res.status === 201) {
                setSuccess(true);
                setTimeout(() => history.push('/login'), 2000);
                return;
            }
            console.log('failure!!!');
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

                        <div className="mb-4">
                            { showSuccess
                                        ? <div className="alert alert-success Register__success text-center">
                                            <img className="borat" src={borat} alt="borat-icon"/>
                                            <b>"VERY NICE! GREATE SUCCESS!"</b>
                                          </div>
                                        :  <button type="submit" className="btn d-grid col-6 mx-auto">Register</button>
                            }
                           
                        </div>
                    </Form>
                </Formik>
            <p className="formOptions">Already registered? <Link to="/login">Login</Link></p>
            </div>
            </Welcome>
    );
}

export default Register;