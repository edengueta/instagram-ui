import { ErrorMessage, Form, Formik } from 'formik';
import React, {useContext, useEffect, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import './UploadAvatar.scss';
import Cookies from 'js-cookie';
import {uploadAvatarSchema} from './uploadAvatar.schem'
import environment from '../../../environments/index';
import { useHistory } from 'react-router-dom';
import { UserService } from '../../../services/user.service';
import { UserContext } from '../../../user-context';



function UploadAvatar() {
    const { user, setUser } = useContext( UserContext );


    const initialValues = {image:''};
	const history = useHistory();
	const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState(user.avatar);

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
		try {
			const res = await fetch (environment.apiUrl +'/user/avatar', {
				method:'POST',
				body:data,
				headers: {
					Authorization: UserService.getToken(),
				}
			})
			const json = await res.json();
			Cookies.set('insta-user', json.token, { expires: 100 });

			const updatedUser = await UserService.me();
			setUser(updatedUser);
			history.push('/profile/' + user.username);

		}catch(err){
			console.log(err);
		}
	}


    return (
		<div className="UploadAvatar">
				<h4>Upload a new avatar</h4>

				<Formik
					initialValues={initialValues}
					validationSchema={uploadAvatarSchema}
					onSubmit ={submit}>
					{({ setFieldValue , isSubmitting})=> (
						<Form className="form">
							<div>
								<div className="form-group my-3">
									<label htmlFor="image" className="image-upload">
										{!selectedFile && <img className="preview" src={user.avatar} />}
										{selectedFile && <img className="preview" alt="preview" src={preview} />}
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
							</div>
							<button
								type="submit"
								className="btn btn-post"
								disabled={isSubmitting}>
									{ isSubmitting ? 'Uploading...' : 'Upload' }
							</button>
						</Form>
					)}

				</Formik>
			</div>
    );
}

export default UploadAvatar;