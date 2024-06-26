import React from 'react'

export const Status = ({ status }) => {
    const styleStatus = {
        color:  (status === 'Requested') ? '#7C9099' :
                (status === 'Accepted' || status === 'Finished') ? 'green' :
                (status === 'Canceled') ? 'red' :
                (status === 'Assigned') ? '#00BCD4' :
                (status === 'Sealed') ? '#9900EF' :
                (status === 'Completed') ? 'orange' :
                (status === 'In-Process') ? '#2196F3' : 'black',
        border: 'solid',
        borderRadius: '15px',
        padding:'2px 8px'
        
    }
    return <span style={styleStatus}>{status}</span>;
}
