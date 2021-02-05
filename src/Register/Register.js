import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { BiUser, BiLockAlt, BiAt } from 'react-icons/bi';
import './Register.scss';
import {registerSchema} from './register.schema'
import FloatingCircles from '../FloatingCircles/FloatingCircles';


function Register(props) {
    const values = {username:'',email:'',password:'',agreeToTerms:false};
    return (
        <div className="Register container">
            <h4>Sign up to see photos and videos from your friends.</h4>
            <Formik
                initialValues={values}
                validationSchema={registerSchema}>
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
                        {console.log(ErrorMessage)}
                    </div>
                    
                    <div className="mb-3 input-group">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <div className="input-group">
                            <span className="input-group-text"><BiAt /></span>
                            <Field type="email" name="email" className="form-control" id="email" placeholder="name@example.com"/>
                        </div>
                        <ErrorMessage className="ErrorMessage" name="email" component="span"/>
                    </div>

                    {/* <div className="input-group">
                        <Field type="checkbox" name="agreeToTerms" className="form-check-input" id="agreeToTerms"/>
                        <label htmlFor="agreeToTerms" className="form-check-label">Agree to terms</label>
                        <ErrorMessage name="agreeToTerms" component="div"/>
                    </div> */}

                    <div className="d-grid col-6 mx-auto">
                        <button type="button" className="btn btn-register">Register</button>
                    </div>
                </Form>
            </Formik>
            
        </div>
    );
}

export default Register;