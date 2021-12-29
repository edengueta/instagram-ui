import React from 'react';
import Cookies from 'js-cookie';
import { UserService } from '../../../../services/user.service';
import './RemoveAvatar.scss'

function RemoveAvatar({close}) { 

    async function remove() {
		try {
			const user = await UserService.removeAvatar(); 
			console.log(user);
			Cookies.set( 'insta-user', user.token, { expires: 100 } );
			close();
			window.location.reload();
		}catch(err){
			console.log(err);
		}
	}

    return (
        <div className='RemoveAvatar'>
			<h6>Sure you want to remove your avatar?</h6>
            <button className='btn' onClick={ ()=> remove() }>
                I'm Sure
            </button>
        </div>
    );
}

export default RemoveAvatar;