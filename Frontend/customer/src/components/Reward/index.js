import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  TablePagination,
} from '@mui/material';
import axios from 'axios';
import styles from './styles.module.css'; 
import Navbar from '../common/Navbar';
import { Search } from '@mui/icons-material';

function Reward() {
  const [rewards, setRewards] = useState([]);
  const [searchCustomerId, setSearchCustomerId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const response = localStorage.getItem('jwt');
    const headers = {
      Authorization: `Bearer ${response}`,
      'Content-Type': 'application/json',
    };

    axios
      .get('http://localhost:8080/rewards', { headers })
      .then((response) => {
        setRewards(response.data);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchCustomerId(e.target.value);
  };

  const filteredRewards = rewards.filter((reward) =>
    reward.customerId.includes(searchCustomerId)
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRewards.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getVisibleRewards = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredRewards.slice(startIndex, endIndex);
  };

  return (
    <>
      <Navbar />
      <div className={styles.headerpart}> 
        <h3 className={styles.heading}><b>REWARDS INFORMATION</b></h3>
        <div className={styles.search}>
        <label className={styles.label}>Search for a Customer : </label>
        <TextField
          label="Search Customer ID"
          size="small"
          variant="outlined"
          value={searchCustomerId}
          onChange={handleSearch}
          style={{maxWidth:'250px'}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        </div>
      </div>
     
      <TableContainer component={Paper} className={styles.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Reward ID</b></TableCell>
              <TableCell><b>Customer Id</b></TableCell>
              <TableCell><b>Order No</b></TableCell>
              <TableCell><b>Rewards Earned</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getVisibleRewards().map((reward) => (
              <TableRow key={reward.rewardsId} className={styles.tableRow}>
                <TableCell>{reward.rewardsId}</TableCell>
                <TableCell>{reward.customerId}</TableCell>
                <TableCell>{reward.orderNo}</TableCell>
                <TableCell>{reward.rewardsEarned}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: filteredRewards.length }]}
        component="div"
        count={filteredRewards.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Reward;
