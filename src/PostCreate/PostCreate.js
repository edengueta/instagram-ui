import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import './PostCreate.scss';
import {postCreateSchema} from './postCreate.schem'
import environment from '../environments';
import { useHistory } from 'react-router-dom';
import { UserService } from '../services/user.service';



function PostCreate() {

    const initialValues = {image:'',caption:''};
	const history = useHistory();
	const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
	
	useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
		const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    function onSelectFile(e){
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
		setSelectedFile(e.target.files[0])
	}

	async function submit(values) {
		const data = new FormData();
		data.append('image',values.image);
		data.append('caption',values.caption);
		try {
			const res = await fetch (environment.apiUrl +'/post', {
				method:'PUT',
				body:data,
				headers: {
					Authorization: UserService.getToken(),
				}
			})
			const newPost= await res.json()
			history.push('/post/' + newPost._id);

		}catch(err){
			console.log(err);
		}
	}


    return (
		<div className="PostCreate">
				<h4>Add your photo</h4>
				<Formik
					initialValues={initialValues}
					validationSchema={postCreateSchema}
					onSubmit ={submit}>
					{({ setFieldValue , isSubmitting})=> (
						<Form className="form">
							<div>
								<div className="form-group my-3">
									<label htmlFor="image" className="image-upload">
										{selectedFile &&  <img className="preview" alt="preview" src={preview} />}
										<BiImageAdd className="upload-icon" />
									</label>
									   
									<input
										type="file"
										id="image"
										name="image"
										accept="image/*"
										onChange={(e)=> {
											setFieldValue('image', e.target.files[0]);
											onSelectFile(e)
											}
										} />
									<ErrorMessage className="ErrorMessage" name="image" component="div"/>
								</div>
								<div className="form-group my-3">
									<Field  as="textarea" className="form-control" name="caption" rows="1" id="caption" placeholder="Add a caption..."></Field>
									<ErrorMessage name="caption" component="span"/>
								</div>
							</div>
							<button
								type="submit"
								className="btn btn-post"
								disabled={isSubmitting}>
									{ isSubmitting ? 'Posting...' : 'Post' }
							</button>
						</Form>
					)}

				</Formik>
			</div>
    );
}

export default PostCreate;