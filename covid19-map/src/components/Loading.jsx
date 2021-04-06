import React from 'react';

const Loading = () => {
    return (
        <div
            style={{height: "10vh", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
        }}
        >
        <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden"></span>
        </div>
        <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden"></span>
        </div>
        <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden"></span>
        </div>
    </div>
    );
};
 
export default Loading;