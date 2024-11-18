import React from 'react';
import './Card.css';
import Imp from '../utils/icons_FEtask/Img - High Priority.svg';
import { LuMoreHorizontal } from 'react-icons/lu';

import { getStatusIcon, getPriorityIcon } from '../utils/helper';
import User from './User.jsx'
export default function Card({ id, title, userId, status, priority, tag, name }) {
    let imageUrl = `https://ui-avatars.com/api/?name=${name}`;
    const words = title?.split(' ');

    const formattedTitle = words?.length > 5
        ? (
            <>
                {words.slice(0, 5).join(' ')}<br />
                {words.slice(5).join(' ')}
            </>
        )
        : title;


    return (
        <>
            <div className='card'>
                <div className='top-container'>
                    <div className='ticket-id'>{id}</div>
                    <User name={name} available={true} />
                </div>
                <div className='middle-container'>

                    {getStatusIcon(status)}
                    <div className='title'>{formattedTitle}</div>
                </div>
                <div className='bottom-container'>
                    <div className='more-icon-container'>

                        {getPriorityIcon(Number(priority))}
                    </div>

                    <div className='tag-container'>
                        <div className='tag-icon'></div>
                        <div className='tag-text'>{tag}</div>
                    </div>

                </div>
            </div>
        </>
    );
}
