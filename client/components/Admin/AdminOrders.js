import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@mui/styles/";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrders } from "../../store/adminInfo";
import AdminOrderForm from "./AdminProductForm";
import { useHistory, useLocation } from "react-router-dom";
import { getParam, setParam } from "../../queryFunctions/queryParam";
import PaginationUI from "../PaginationUI";
import { FETCH_PENDING, FETCH_ERROR} from "../../../constants"

const useStyles = makeStyles({

  iconButtonRoot: {
    color: "#3070e6",
    width: "90%"
  },
  tableHeader: {
    backgroundColor: "#30b2e6"
  },
  headerCell: {
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "Courier"
  },
  grid: {
    marginTop: "10px"
  }
});


const AdminOrders = (props) => {
  const { setSnackbarStatus, setSnackbarMessage, setSnackbarSeverity } = props;
  const classes = useStyles();
  const orders = useSelector((state) => state.admin.orders) || [];
  const total = useSelector((state) => state.admin.totalOrders);
  const fetchStatus = useSelector((state) => state.admin.getOrdersStatus);
  const [formName, setFormName] = useState("Default");
  const [dialogStatus, setDialogStatus] = useState(false);
  const [selectedData, setSelectedData] = useState({});


  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const pgNum = getParam(location, "page");
    if (!pgNum) {
      let query = setParam(location, "page", 1);
      query = setParam(query, "sort", "name");
      query = setParam(query, "dir", "asc");
      history.replace(`${location.pathname}?${query}`);
    } else {
      dispatch(fetchAdminOrders(location));
    }
  }, []);


  useEffect(() => {
    dispatch(fetchAdminOrders(location));
  }, [location.search]);

  if (fetchStatus === FETCH_PENDING ) {
    return (
      <div className="loading">Loading :{orders}!</div>

    )
  } else if (fetchStatus === FETCH_ERROR ) {
    return (
      <div className="errors">Error Loading: {orders}!</div>
    )
  } else

  return (
    <React.Fragment>
      <TableContainer >
        <Table size="sm">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.headerCell}>Order Number</TableCell>
              <TableCell className={classes.headerCell}>Order Status</TableCell>
              <TableCell className={classes.headerCell}>SubTotal $</TableCell>
              <TableCell className={classes.headerCell}>Total Items</TableCell>
              <TableCell className={classes.headerCell}>Customer Email</TableCell>
              <TableCell className={classes.headerCell}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.subTotal}</TableCell>
                <TableCell>{order.orderQty}</TableCell>
                <TableCell>{order.customerEmail}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        setSelectedData(order);
                        setDialogStatus(true);
                        setFormName("Edit Order");
                      }}
                      classes={{ root: classes.iconButtonRoot }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton classes={{ root: classes.iconButtonRoot }}>
                      <HighlightOffIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        className={classes.grid}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start">
        <Grid item>
          <PaginationUI arr={orders} total={total} />
        </Grid>
      </Grid>
      <AdminOrderForm
        setSnackbarStatus={setSnackbarStatus}
        setSnackbarMessage={setSnackbarMessage}
        dialogStatus={dialogStatus}
        product={selectedData}
        formName={formName}
        setDialogStatus={setDialogStatus}
        setSnackbarSeverity={setSnackbarSeverity}
      />
    </React.Fragment>
  );
};

export default AdminOrders;
