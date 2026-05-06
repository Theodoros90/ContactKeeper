import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const { alert } = alertContext;

    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}
                style={{ margin: '1em 0', padding: '0.8em 1.2em', borderRadius: '8px', textAlign: 'center' }}>
                {alert.msg}
            </div>
        )
    );
};

export default Alert;
