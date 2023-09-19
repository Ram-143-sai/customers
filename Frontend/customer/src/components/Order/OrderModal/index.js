import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  FormHelperText,
} from '@mui/material';

const OrderModal = ({
  isOpen,
  handleClose,
  orderData,
  withCoins,
  setWithCoins,
  setOrderData,
  handleSave,
}) => {
  const [customerIdValid, setCustomerIdValid] = useState(true);
  const [totalItemsValid, setTotalItemsValid] = useState(true);
  const [orderTotalValid, setOrderTotalValid] = useState(true);
  const [currencyValid, setCurrencyValid] = useState(true);
  const [customerPhoneNoValid, setCustomerPhoneNoValid] = useState(true);
  const [withCoinsValid, setWithCoinsValid] = useState(true);
  const [orderStatusValid, setOrderStatusValid] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setCustomerIdValid(true);
      setTotalItemsValid(true);
      setOrderTotalValid(true);
      setCurrencyValid(true);
      setCustomerPhoneNoValid(true);
      setWithCoinsValid(true);
      setOrderStatusValid(true);
    }
  }, [isOpen]);

  const handleSaveClick = () => {
    if (
      orderData.customerId &&
      orderData.totalItems &&
      orderData.orderTotal &&
      orderData.currency &&
      orderData.customerPhoneNo &&
      withCoins &&
      orderData.orderStatus
    ) {
      handleSave();
    } else {
      setCustomerIdValid(!!orderData.customerId);
      setTotalItemsValid(!!orderData.totalItems);
      setOrderTotalValid(!!orderData.orderTotal);
      setCurrencyValid(!!orderData.currency);
      setCustomerPhoneNoValid(!!orderData.customerPhoneNo);
      setWithCoinsValid(!!withCoins);
      setOrderStatusValid(!!orderData.orderStatus);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{orderData.orderNo ? 'Edit an existing Order' : 'Add a new Order'}</DialogTitle>
      <DialogContent style={{ paddingTop: '8px' }}>
        <DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Customer ID"
                variant="outlined"
                fullWidth
                required
                value={orderData.customerId}
                disabled={orderData.orderNo !== undefined}
                onChange={(e) => setOrderData({ ...orderData, customerId: e.target.value })}
              />
              {!customerIdValid && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Total Items"
                variant="outlined"
                fullWidth
                required
                type="number"
                value={orderData.totalItems}
                disabled={orderData.orderNo !== undefined}
                onChange={(e) => setOrderData({ ...orderData, totalItems: e.target.value })}
              />
              {!totalItemsValid && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Order Total"
                variant="outlined"
                fullWidth
                required
                type="number"
                value={orderData.orderTotal}
                disabled={orderData.orderNo !== undefined}
                onChange={(e) => setOrderData({ ...orderData, orderTotal: e.target.value })}
              />
              {!orderTotalValid && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="currency">Currency</InputLabel>
                <Select
                  label="Currency"
                  value={orderData.currency}
                  onChange={(e) => setOrderData({ ...orderData, currency: e.target.value })}
                  disabled={orderData.orderNo !== undefined}
                >
                  <MenuItem value="INR">INR</MenuItem>
                  <MenuItem value="$">$</MenuItem>
                </Select>
                {!currencyValid && <FormHelperText error>This field is required.</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Customer Phone Number"
                variant="outlined"
                fullWidth
                required
                value={orderData.customerPhoneNo}
                disabled={orderData.orderNo !== undefined}
                onChange={(e) =>
                  setOrderData({ ...orderData, customerPhoneNo: e.target.value })
                }
              />
              {!customerPhoneNoValid && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="withCoins">Redeem(?)</InputLabel>
                <Select
                  label="withCoins"
                  value={withCoins}
                  onChange={(e) => setWithCoins(e.target.value)}
                  disabled={orderData.orderNo !== undefined}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
                {!withCoinsValid && <FormHelperText error>This field is required.</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="orderStatus">Order Status</InputLabel>
                <Select
                  label="Order Status"
                  value={orderData.orderStatus}
                  onChange={(e) => setOrderData({ ...orderData, orderStatus: e.target.value })}
                >
                  <MenuItem value="Created">Created</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                </Select>
                {!orderStatusValid && (
                  <FormHelperText error>This field is required.</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;
