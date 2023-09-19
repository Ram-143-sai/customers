import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from '@mui/material';

const Orders = ({ orders }) => {
  const formatDate = (dateString) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      {orders.length>0 ? <TableContainer component={Paper} style={{ maxHeight: 200 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Order No</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Rewards Earned</b></TableCell>
            <TableCell><b>Rewards Redeemed</b></TableCell>
            <TableCell><b>Total Order Value</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {orders.map((order) => (
            <TableRow key={order.orderKey}>
              <TableCell>{order.orderNo}</TableCell>
              <TableCell>{formatDate(order.orderDate)}</TableCell>
              <TableCell>{order.reward.rewardsEarned}</TableCell>
              <TableCell>{order.reward.rewardsRedeemed}</TableCell>
              <TableCell>{order.orderTotal} {order.currency}</TableCell>
            </TableRow>
          ))} 
        </TableBody> 
      </Table>
      </TableContainer> : <h3>No orders have been placed by the customer!</h3> }
    </Paper>
  );
};

export default Orders;