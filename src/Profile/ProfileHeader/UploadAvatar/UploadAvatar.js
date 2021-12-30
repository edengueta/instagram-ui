import React, {useContext, useEffect, useState } from 'react';
import './UploadAvatar.scss';
import { ErrorMessage, Form, Formik } from 'formik';
import { BiTrash } from 'react-icons/bi';
import { BsUpload } from 'react-icons/bs';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';
import { uploadAvatarSchema } from './uploadAvatar.schem'
import { UserService } from '../../../services/user.service';
import { UserContext } from '../../../user-context';
import RemoveAvatar from './RemoveAvatar/RemoveAvatar';
import avatarDefault from '../../../common/Avatar/avatar.png';
import { isMobile } from 'react-device-detect';
import PreviewGallery from './PreviewGallery/PreviewGallery';


function UploadAvatar({close,posts}) {
    const { user, setUser } = useContext( UserContext );
    const initialValues = {image:''};
	const [selectedFile, setSelectedFile] = useState();
	const [selectedPost, setSelectedPost] = useState();
    const [preview, setPreview] = useState(user.avatar);
	useEffect(() => {

        if (!selectedFile && !selectedPost) {
            setPreview(undefined);
            return
        }

		const objectUrl = typeof selectedFile ==='object' ? URL.createObjectURL(selectedFile) : selectedPost;
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)

    }, [ selectedPost , selectedFile ])

	function postClicked(image){
		setSelectedPost(image);
		setSelectedFile(image);
	}

    function onSelectFile(e){
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
		setSelectedFile(e.target.files[0]);
	}

	async function submit(values) {

		if (typeof selectedFile ==='object') { 
			const data = new FormData();
			data.append('image',values.image);

				try {
					const user = await UserService.uploadAvatar(data); 
					Cookies.set('insta-user', user.token, { expires: 100 });
				}catch(err){
					console.log(err);
				}
		} else {
				try {
					const user = await UserService.replaceAvatar(selectedPost); 
					Cookies.set('insta-user', user.token, { expires: 100 });
				}catch(err){
					console.log(err);
				}
		}
		
		try {
			const updatedUser = await UserService.me();
			setUser(updatedUser);
			close();
			window.location.reload();
		}catch(err){
			console.log(err);
		}
	}
	const userAvatar = user.avatar ? user.avatar : avatarDefault;

    return (
		<div className="UploadAvatar">
				<h4>Choose a new avatar</h4>
				<div className="form-wrapper">
					<PreviewGallery posts={posts} postClicked={postClicked}/>
					<Formik
						initialValues={initialValues}
						// validationSchema={uploadAvatarSchema}
						onSubmit ={submit}>
						{({ setFieldValue , isSubmitting })=> (
							<Form className="form">

								<div>
									<div className="form-group my-3">
										{ user.avatar && (
											<Popup
												trigger={ <div className="remove-icon"> <BiTrash/> </div> }
												nested = {!isMobile}
												modal={isMobile}
												closeOnDocumentClick >
														{ close => ( <RemoveAvatar close={close}/> ) }
											</Popup>										
										)}

										<label htmlFor="image" className="image-upload">
											<img
												className="preview"
												alt="previewing user's avatar"
												src={ selectedFile ? preview : userAvatar }
											/>
											<BsUpload className="update-icon"/>
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
								{ selectedFile  &&
									<button
										type="submit"
										className="btn btn-post"
										disabled={isSubmitting}>
											{ !isSubmitting ? 'Save' : 'Saving...' }
									</button>
								}

							</Form>
						)}

					</Formik>

				</div>
			</div>
    );
}

export default UploadAvatar;