import React from 'react';
import FloatingCircles from './FloatingCircles/FloatingCircles';
import './Welcome.scss'

function Welcome(props) {
    return (
        <div className="bg">
            {props.children}

            {/* <FloatingCircles/> */}
        </div>
    );
}

export default Welcome;