import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/orders";
import { FETCH_FAILED, FETCH_PENDING } from "../../constants";
import OrderTable from "./OrderTable";
import LoadingBar from "./LoadingBar";
import NotFound from "./NotFound";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  formControlRoot: {
    width: "100%"
  }
}));

const Orders = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders) || [];
  const fetchStatus = useSelector((state) => state.orders.fetchStatus);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (fetchStatus === FETCH_PENDING) {
    return (
      <div className="loading">
        <LoadingBar />
      </div>
    );
  } else if (fetchStatus === FETCH_FAILED) {
    const error = 500;
    const message = "OOPS! SERVER ERROR";
    return (
      <div>
        <NotFound error={error} message={message} />
      </div>
    );
  }

  return (
    <Grid item xs={12} className="orders-page">
      <div className={styles.paperRoot}>
        <div className="orders-header">
          <h4 className="orders-title">Order History</h4>
        </div>
        <OrderTable orders={orders} />
      </div>
    </Grid>
  );
};

export default Orders;
