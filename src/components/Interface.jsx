import React from 'react';
import Card from './Card';
import './Interface.css';
import plus from '../utils/icons_FEtask/add.svg';
import dot from '../utils/icons_FEtask/3 dot menu.svg';
import { getStatusIcon, getPriorityIcon, getPriorityText, getStatusText } from '../utils/helper';
import User from './User';

export default function Interface({ displayTickets, users, gU, gS, gP }) {
    console.log('Display Tickets:', displayTickets);
    console.log('Users:', users);

    return (
        <div>
            <div className="statusPage">
                {displayTickets.length === 0 && <p>No tickets to display</p>}
                {displayTickets.map(([group, tickets]) => (
                    <div className="statusGroup" key={group}>

                        {gU && (
                            <div className="big-div">
                                <div className="start-group">

                                    {(() => {
                                        const user = users.find((user) => user.id === group);
                                        return user ? (
                                            <>
                                                <User name={user.name} available={user.available} />
                                                {user.name}
                                            </>
                                        ) : (
                                            "Unknown User"
                                        );
                                    })()}
                                    <p>{tickets.length}</p>
                                </div>
                                <div className="end-group">
                                    <img src={plus} alt="Add" />
                                    <img src={dot} alt="Options" />
                                </div>
                            </div>
                        )}


                        {gP && (
                            <div className="big-div">
                                <div className="start-group">
                                    {getPriorityIcon(Number(group))}
                                    {getPriorityText(Number(group))}
                                    <p>{tickets.length}</p>
                                </div>
                                <div className="end-group">
                                    <img src={plus} alt="Add" />
                                    <img src={dot} alt="Options" />
                                </div>
                            </div>
                        )}


                        {gS && (
                            <div className="big-div">
                                <div className="start-group">
                                    {getStatusIcon(String(group))}
                                    {getStatusText(String(group))}
                                    <p>{tickets.length}</p>
                                </div>
                                <div className="end-group">
                                    <img src={plus} alt="Add" />
                                    <img src={dot} alt="Options" />
                                </div>
                            </div>
                        )}

                        <div className="cardContainer">
                            {tickets.map((ticket) => {

                                const user = Array.isArray(users) ? users.find((user) => user.id === ticket.userId) : null;

                                return (
                                    <Card
                                        key={ticket.id}
                                        id={ticket.id}
                                        title={ticket.title}
                                        tag={ticket.tag}
                                        name={user?.name || 'Unassigned'}
                                        priority={ticket.priority}
                                        status={ticket.status}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
