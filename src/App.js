import './App.css';
import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Loader from './components/Loader';
import Footer from './components/Footer';

import DragKanban from './Drag/DragKanban';
import { Route, Router, Routes } from 'react-router-dom';
import DragBoard from './Drag/DragBoard';


function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setTickets(data.tickets);
        setUsers(data.users);
        console.log(users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    console.log("Tickets Updated:", tickets);
  }, [tickets]);

  useEffect(() => {
    console.log("Users Updated:", users);
  }, [users]);

  if (loading) return <Loader />
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='bg'>
      <Routes>
        <Route path="/" element={<Board tickets={tickets} users={users} />} />
        <Route path="/drag" element={<DragBoard />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
