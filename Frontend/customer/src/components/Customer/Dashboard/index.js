import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Profile from './Profile';
import Orders from './Orders';
import Rewards from './Rewards';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';


const Dashboard = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState({});


  const goBack = () => {
		navigate(-1);
	}

  useEffect(() => {
    const response = localStorage.getItem('jwt');
    const headers = {
      Authorization: `Bearer ${response}`,
      'Content-Type': 'application/json',
    };

    axios
      .get(`http://localhost:8080/customers/${customerId}`, { headers })
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });

    axios
      .get(`http://localhost:8080/orders/${customerId}`, { headers })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, [customerId]);

  return (
    <Container maxWidth="lg" className={styles.container}>
        <Container>
         <Typography variant="h5" className={styles.heading} align="center" marginBottom={2}>
          <ArrowBack onClick={goBack} className={styles.back}/>
          <b>CUSTOMER DASHBOARD</b>
        </Typography>
        </Container>
      <Paper className={styles.paper}>
      <Typography variant="h5" className={styles.heading} marginBottom={2} >
        Profile
      </Typography>
        <Profile customer={customer} />
      </Paper>

      <Paper className={styles.paper}>
        <Typography variant="h5" className={styles.heading} marginBottom={2}>
          Rewards Summary
        </Typography>
        <Rewards id={customerId} />
      </Paper>

      <Paper className={styles.paper} >
        <Typography variant="h5" className={styles.heading} marginBottom={2}>
          Order History
        </Typography>
        <Orders orders={orders} />
      </Paper>
    </Container>
  );
};

export default Dashboard;