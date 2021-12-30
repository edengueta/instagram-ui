import React from 'react';
import Cookies from 'js-cookie';
import { UserService } from '../../../../services/user.service';
import './RemoveAvatar.scss'

function RemoveAvatar({close}) { 

    async function remove() {
		try {
			const user = await UserService.removeAvatar(); 
			Cookies.set( 'insta-user', user.token, { expires: 100 } );
			close();
			window.location.reload();
		}catch(err){
			console.log(err);
		}
	}

    setTimeout(remove, 800);
    
    return (
        <div className='RemoveAvatar'>
			{/* <h6>Sure you want to remove your avatar?</h6>
            <button className='btn' onClick={ ()=> remove() }>
                I'm Sure
            </button> */}
            <h6>Removing your avatar...</h6>
        </div>
        

);
}

export default RemoveAvatar;