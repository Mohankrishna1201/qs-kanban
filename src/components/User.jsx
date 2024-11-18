
import React from 'react';
import './user.css'

function User({ name, available }) {
    const text = React.useMemo(() => {
        return name.split(" ").map((item) => item[0]).join("");
    }, [name]);

    return (
        <div className='usericon-container'>
            <div className='txt1'>{text}</div>
            <div className={`user-status ${available && "available"}`}></div>
        </div>
    );
}

export default User;
