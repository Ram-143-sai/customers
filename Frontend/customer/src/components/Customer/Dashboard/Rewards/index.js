import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Grid, Paper, Box, Divider } from '@mui/material';
import { MonetizationOn, AttachMoney, MoneyOff } from '@mui/icons-material';

const Rewards = ({ id }) => {
  const [rewardsData, setRewardsData] = useState({
    rewardsEarned: 0.0,
    rewardsRedeemed: 0.0,
    rewardsBalance: 0.0,
  });

  useEffect(() => {
    const response = localStorage.getItem('jwt');
    const headers = {
      Authorization: `Bearer ${response}`,
      'Content-Type': 'application/json',
    };
    const apiUrl = `http://localhost:8080/rewards/rewardDetails/${id}`;

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        const { data } = response;
        setRewardsData({
          rewardsEarned: data[0],
          rewardsRedeemed: data[1],
          rewardsBalance: data[2],
        });
      })
      .catch((error) => {
        console.error('Error fetching reward details:', error);
      });
  }, [id]);

  return (
    <Paper elevation={3} sx={{ p: 2 }} >
      <Grid container spacing={2} >
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <MonetizationOn color="primary" sx={{ fontSize: 40 }} />
            &nbsp; &nbsp;
            <div>
              <Typography variant="h6">Earned Coins</Typography>
              <Typography variant="subtitle1">{rewardsData.rewardsEarned} coins</Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
          <MoneyOff color="error" sx={{ fontSize: 40 }} />
            &nbsp;
            <div>
              <Typography variant="h6">Redeemed Coins</Typography>
              <Typography variant="subtitle1">{rewardsData.rewardsRedeemed} coins</Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <AttachMoney color="success" sx={{ fontSize: 40 }} />
            &nbsp; 
            <div>
              <Typography variant="h6">Balance Coins</Typography>
              <Typography variant="subtitle1">{rewardsData.rewardsBalance} coins</Typography>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="textPrimary">
        Note : Earned Coins represent the total coins earned, Redeemed Coins represent the coins spent or redeemed, and Balance Coins represent the remaining coins.
      </Typography>
    </Paper>
  );
};

export default Rewards;