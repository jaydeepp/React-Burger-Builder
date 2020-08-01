import React from 'react';

import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

const modal = props => {

    return (
        <Auxiliary>
            <Backdrop show={props.show} closed={props.closed} />
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Auxiliary>
    );

}

export default React.memo(modal, (prevProps, nextProps) => prevProps.show === nextProps.show && prevProps.children === nextProps.children);