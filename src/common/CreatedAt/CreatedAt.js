import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './CreatedAt.scss';

function CreatedAt({link, date}) {
    return (
        <div className="CreatedAt">
            <Link to={link}>
                <Moment className="date" fromNow>{date}</Moment>
            </Link>
        </div>
    );
}
export default CreatedAt;