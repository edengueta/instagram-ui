import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { BiImageAdd } from 'react-icons/bi';
import './PostCreate.scss';
import {postCreateSchema} from './postCreate.schem'
import environment from '../environments';
import { useHistory } from 'react-router-dom';
import { UserService } from '../services/user.service';



function PostCreate() {

    const initialValues = {image:'',caption:''};
	const history = useHistory();

	async function submit(values) {
		const data = new FormData();
		data.append('image',values.image);
		data.append('caption',values.caption);
		try {
			await fetch (environment.apiUrl +'/post', {
				method:'PUT',
				body:data,
				headers: {
					Authorization: UserService.getToken(),
				}
			})
			history.push('/');
		}catch(err){
			console.log(err);
		}

	}

    return (
		<div className="PostCreate">
				<h2>Create Post</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={postCreateSchema}
					onSubmit ={submit}>
					{({ setFieldValue , isSubmitting})=> (
						<Form className="mt-5 col-lg-8 px-0">
							<div className="form-group my-3">
								<label htmlFor="image" className="image-upload">
									<BiImageAdd/>
								</label>   
								<input
									type="file"
									id="image"
									name="image"
									onChange={(e)=>  setFieldValue('image', e.target.files[0])}
								/>
								<ErrorMessage name="image" component="span"/>
							</div>
							<div className="form-group my-3">
								<Field  as="textarea" className="form-control" name="caption" id="caption" placeholder="Write a caption..."></Field>
								<ErrorMessage name="caption" component="span"/>
							</div>
							<div className="form-group text-right my-3">
								<button
									type="submit"
									className="btn d-grid mx-auto col-6"
									disabled={isSubmitting}>
										{ isSubmitting ? 'Posting...' : 'Post' }
								</button>
							</div>
						</Form>
					)}

				</Formik>
			</div>
    );
}

export default PostCreate;