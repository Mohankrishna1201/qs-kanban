import React, { useState, useEffect, useRef } from 'react';
import { groupBy, sortByKey } from '../utils/apiHelper.js';
import '../components/Board.css';

import DisplayIcon from '../utils/icons_FEtask/Display.svg';
import Arrow from '../utils/icons_FEtask/down.svg'
import DragKanban from './DragKanban.jsx';
import data from '../utils/DragHelper';
import { groupTicketsByStatus, users, tickets, groupTicketsByPriority, groupTicketsByUsers } from '../utils/DragHelper'
export default function DragBoard() {
    const [isOpen, setIsOpen] = useState(false);

    const [userList, setUsers] = useState(users);
    const [disData, setDisData] = useState(groupTicketsByStatus(data.tickets));

    const [groupUser, setGroupUser] = useState(false);
    const [groupPrior, setGroupPrior] = useState(false);
    const [groupStat, setGroupStat] = useState(true);
    const dropdownRef = useRef(null);



    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    console.log('finalc')
    console.log(disData);

    const handleGroupChange = (event) => {
        const value = event.target.value.toLowerCase();


        let groupingKey = 'status';
        setGroupStat(true);
        setGroupUser(false);
        setGroupPrior(false);
        setDisData(groupTicketsByStatus(data.tickets))
        if (value === 'user') {
            groupingKey = 'userId';
            setGroupUser(true);
            setGroupStat(false);
            setGroupPrior(false);
            setDisData(groupTicketsByUsers(data.tickets))

        } else if (value === 'priority') {
            groupingKey = 'priority';
            setGroupPrior(true);
            setGroupUser(false);
            setGroupStat(false);
            setDisData(groupTicketsByPriority(data.tickets));
        }

        console.log(disData);
    };


    const handleOrderChange = (event) => {
        const value = event.target.value.toLowerCase();


        let sortingKey = 'priority';
        let check = false;
        if (value === 'title') {
            sortingKey = 'title';
            check = true
        }


        const sortedData = disData.map(([group, tickets]) => {
            const sortedTickets = sortByKey(tickets, sortingKey, check);
            return [group, sortedTickets];
        });

        console.log('Sorted Data:', sortedData);
        setDisData(sortedData);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div>
            <div className='nav'>
                <div className="dropdown" ref={dropdownRef}>
                    <button onClick={toggleDropdown} className="dropdown-toggle">
                        <img src={DisplayIcon} alt="" />
                        <span className='txt'>Display</span>
                        <img src={Arrow} alt="" />
                    </button>
                    {isOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item">
                                <label htmlFor="grouping">Grouping</label>
                                <select id="grouping" onChange={handleGroupChange}>
                                    <option value="Status">Status</option>
                                    <option value="User">User</option>
                                    <option value="Priority">Priority</option>
                                </select>
                            </div>
                            <div className="dropdown-item">
                                <label htmlFor="ordering">Ordering</label>
                                <select id="ordering" onChange={handleOrderChange}>
                                    <option value="Priority">Priority</option>
                                    <option value="Title">Title</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>




            </div>

            <p className="title2">Drag and Drop to Update Status/Priority/User</p>

            <DragKanban passTickets={disData} users={userList} gU={groupUser} gP={groupPrior} gS={groupStat} />
        </div>
    );
}
