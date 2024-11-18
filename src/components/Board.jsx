import React, { useState, useEffect, useRef } from 'react';
import { groupBy, sortByKey } from '../utils/apiHelper.js';
import './Board.css';
import Interface from './Interface.jsx';
import DisplayIcon from '../utils/icons_FEtask/Display.svg';
import Arrow from '../utils/icons_FEtask/down.svg'
import { useNavigate } from "react-router-dom";
export default function Board({ tickets, users }) {
    const [isOpen, setIsOpen] = useState(false);
    const [disData, setDisData] = useState([]);
    const [groupUser, setGroupUser] = useState(false);
    const [groupPrior, setGroupPrior] = useState(false);
    const [groupStat, setGroupStat] = useState(true);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const groupedData = groupBy(tickets, 'status');
        const groupedArray = Object.entries(groupedData);
        groupedArray.push(['Done', []], ['Cancelled', []]);
        console.log('Grouped Array:', groupedArray);
        setDisData(groupedArray);
    }, [])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const handleGroupChange = (event) => {
        const value = event.target.value.toLowerCase();


        let groupingKey = 'status';
        setGroupStat(true);
        setGroupUser(false);
        setGroupPrior(false);

        if (value === 'user') {
            groupingKey = 'userId';
            setGroupUser(true);
            setGroupStat(false);
            setGroupPrior(false);
        } else if (value === 'priority') {
            groupingKey = 'priority';
            setGroupPrior(true);
            setGroupUser(false);
            setGroupStat(false);

        }

        const groupedData = groupBy(tickets, groupingKey);
        const groupedArray = Object.entries(groupedData);






        setDisData(groupedArray);
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
                <button onClick={() => navigate('/drag')} className="dropdown2">
                    <span className='txt'>Advanced Drag and Drop Feauture</span>
                </button>
            </div>



            <Interface displayTickets={disData} users={users} gU={groupUser} gP={groupPrior} gS={groupStat} />
        </div>
    );
}
