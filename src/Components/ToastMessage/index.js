import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = ({ type, message, backToInitialState }) => {
    useEffect(() => {
        if (type) {
            let getMessage = message;
            if (type === 'sucess') {
                toast.success(getMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: 'dark',
                    color: '#fff',
                    onClose: () => backToInitialState(),
                });
            }
            if (type === 'error') {
                toast.error(getMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: toast.COLORED,
                    onClose: () => backToInitialState(),
                });
            } else {
                toast.success(getMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: toast.COLORED,
                    onClose: () => backToInitialState(),
                });
            }
        }
    }, [type, message]);

    return (
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    );
};

export default ToastMessage;
