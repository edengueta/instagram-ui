import './Avatar.scss'
import PropTypes from 'prop-types';
import avatarDefault from './batman_avatar.png';
import { Link } from 'react-router-dom';

function Avatar(props) {

    const image = props.image || avatarDefault;
    const size = props.size || 'avatar-md';
    const link = props.link || '';

    const  imgElement = <img src={image} alt="avatar" className={`Avatar avatar-${size}`}/>

    if (link) {
        return (
            <Link className="avatarLink" to={"/profile/" + link}>
                {imgElement}
            </Link>
        )
    } else {
        return imgElement
    }

}

Avatar.propTypes={
    size: PropTypes.oneOf(['sm','md','lg']),
};

export default Avatar;
