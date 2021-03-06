import React from 'react';

import Aux from '../Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

import useHttpErrorHandler from '../../hooks/http-error-handler';

const errorHandler = (WrappedComponent, axios) => {

    return props => {

        const [error, clearError] = useHttpErrorHandler(axios);
            return (
                <Aux>
                    <Modal show={error} closed={clearError}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            )
        }

}



export default errorHandler;