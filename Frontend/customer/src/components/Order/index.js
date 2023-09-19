import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import styles from "./styles.module.css";
import Navbar from "../common/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import OrderModal from "./OrderModal";
import { Search } from "@mui/icons-material";

function Order() {
  const [orders, setOrders] = useState([]);
  const [searchCustomerId, setSearchCustomerId] = useState("");
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModalData, setOrderModalData] = useState({
    customerId: "",
    totalItems: 0,
    orderTotal: 0.0,
    currency: "INR",
    customerPhoneNo: "",
    orderStatus: "Created",
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [withCoinsData, setWithCoinsData] = useState("yes");

  useEffect(() => {
    const response = localStorage.getItem("jwt");
    const headers = {
      Authorization: `Bearer ${response}`,
      "Content-Type": "application/json",
    };

    axios
      .get("http://localhost:8080/orders", { headers })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []);

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

  const handleAddition = () => {
    setOrderModalData({
      customerId: "",
      totalItems: 0,
      orderTotal: 0,
      currency: "INR",
      customerPhoneNo: "",
      orderStatus: "Created",
    });

    setWithCoinsData(withCoinsData);
    setIsOrderModalOpen(true);
  };

  const dataToSend = {
    orderModalData,
    withCoinsData,
  };

  const getVisibleOrders = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };

  const handleUpdate = (orderNo) => {
    const selected = orders.find((order) => order.orderNo === orderNo);

    setOrderModalData(selected);

    setIsOrderModalOpen(true);
  };

  const handleView = (orderNo) => {
    const selected = orders.find((order) => order.orderNo === orderNo);
    setSelectedOrder(selected);
    setIsViewModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchCustomerId(e.target.value);
  };

  const handleDelete = (orderNo) => {
    setDeleteOrderId(orderNo);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    const response = localStorage.getItem("jwt");
    const headers = {
      Authorization: `Bearer ${response}`,
      "Content-Type": "application/json",
    };

    axios
      .delete(`http://localhost:8080/orders/${deleteOrderId}`, { headers })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Order has been deleted successfully", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 900,
          });
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.orderNo !== deleteOrderId)
          );
        } else {
          toast.error("Order cannot be deleted!", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 900,
          });
        }
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error(
          `Error deleting the order ${deleteOrderId}: ${error.message}`
        );
        toast.error("Order cannot be deleted!", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 900,
        });
        setIsDeleteModalOpen(false);
      });
  };

  const handleDeleteCancel = () => {
    setDeleteOrderId(null);
    setIsDeleteModalOpen(false);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setSelectedOrder(null);
  };

  const handleOrderModalClose = () => {
    setIsOrderModalOpen(false);
    setOrderModalData({
      customerId: "",
      totalItems: 0,
      orderTotal: 0,
      currency: "INR",
      customerPhoneNo: "",
      orderStatus: "Created",
    });
  };

  const handleOrderModalSave = () => {
    const response = localStorage.getItem("jwt");
    const headers = {
      Authorization: `Bearer ${response}`,
      "Content-Type": "application/json",
    };

    if (orderModalData.orderNo) {
      axios
        .put(
          `http://localhost:8080/orders/${orderModalData.orderNo}`,
          orderModalData,
          { headers }
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success("Order has been updated successfully", {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 900,
            });
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.orderNo === orderModalData.orderNo
                  ? orderModalData
                  : order
              )
            );
          } else {
            toast.error("An error occurred while updating the order!", {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 900,
            });
          }
          setIsOrderModalOpen(false);
        })
        .catch((error) => {
          console.error(
            `Error updating the order ${orderModalData.orderNo}: ${error.message}`
          );
          toast.error("Failed to update the order. Please try again!", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 900,
          });
          setIsOrderModalOpen(false);
        });
    } else {
      axios
        .post("http://localhost:8080/orders", dataToSend, { headers })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            toast.success("Order has been added successfully", {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 900,
            });
            setOrders((prevOrders) => [...prevOrders, response.data]);
          } else {
            toast.error("An error occurred while adding the order!", {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 900,
            });
          }
          setIsOrderModalOpen(false);
        })
        .catch((error) => {
          console.error(`Error adding the order: ${error.message}`);
          toast.error("Failed to add the order. Please try again!", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 900,
          });
          setIsOrderModalOpen(false);
        });
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.customerId.includes(searchCustomerId)
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredOrders.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Navbar />
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
          <b>ORDERS INFORMATION</b>
        </div>
        <div className={styles.actionsContainer}>
        <div className={styles.search}>
          <label className={styles.label} >Search for a Customer :  </label>
          <TextField
            label="Search Customer ID"
            size="small"
            variant="outlined"
            value={searchCustomerId}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          </div>
          <Button
            style={{ maxWidth: "200px", maxHeight: "40px"}}
            variant="contained"
            className={`${styles.button} ${styles.addOrderButton}`}
            onClick={handleAddition}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
      <TableContainer component={Paper} className={styles.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Order No</b>
              </TableCell>
              <TableCell>
                <b>Customer ID</b>
              </TableCell>
              <TableCell>
                <b>Total Order Amount</b>
              </TableCell>
              <TableCell>
                <b>Order Status</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getVisibleOrders().map((order) => (
              <TableRow key={order.orderNo} className={styles.tableRow}>
                <TableCell>{order.orderNo}</TableCell>
                <TableCell>{order.customerId}</TableCell>
                <TableCell>{order.orderTotal} {order.currency}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>
                  <Button
                    sx={{ mr: 2 }}
                    variant="contained"
                    color="primary"
                    className={`${styles.button} ${styles.primaryButton}`}
                    onClick={() => handleView(order.orderNo)}
                  >
                    <VisibilityIcon />
                  </Button>
                  <Button
                    sx={{ mr: 2 }}
                    variant="contained"
                    color="success"
                    className={`${styles.button} ${styles.secondaryButton}`}
                    onClick={() => handleUpdate(order.orderNo)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    className={`${styles.button} ${styles.tertiaryButton}`}
                    onClick={() => handleDelete(order.orderNo)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isDeleteModalOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {" "}
            Are you sure you want to delete this order?{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isViewModalOpen} onClose={handleViewModalClose}>
        <DialogTitle>Order Details</DialogTitle>
        {selectedOrder && (
          <>
            <DialogContent>
              <DialogContentText>
                <div>
                  <Typography variant="body1">
                    <b>Order No : </b> {selectedOrder.orderNo}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1">
                    <b>Customer ID : </b> {selectedOrder.customerId}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1">
                    <b>Total Order Amount : </b> {selectedOrder.orderTotal} {selectedOrder.currency}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1">
                    <b>Order Status : </b> {selectedOrder.orderStatus}
                  </Typography>
                </div>
                  <div>
                  <Typography variant="body1">
                    <b>Order Date : </b> {formatDate(selectedOrder.orderDate)}
                  </Typography>
                  </div>
                  <Typography variant="body1">
                    <b>Last Modified : </b> {formatDate(selectedOrder.lastModifiedTS)}
                  </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleViewModalClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <OrderModal
        isOpen={isOrderModalOpen}
        handleClose={handleOrderModalClose}
        orderData={orderModalData}
        withCoins={withCoinsData}
        setWithCoins={setWithCoinsData}
        setOrderData={setOrderModalData}
        handleSave={handleOrderModalSave}
      />
      <ToastContainer />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: filteredOrders.length }]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Order;

