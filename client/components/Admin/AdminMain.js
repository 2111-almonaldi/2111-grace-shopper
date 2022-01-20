
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles/";
import AdminTabSelector from "./AdminTabSelector";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1em 0"
  },
  adminView: {
    width: "90%",
    margin: "0 auto"
  },
  adminTable: {
    width: "100%",
    margin: "0 0 2em 0"
  },
  subHeader: {
    padding: "1em 0 1.2em 0",
    fontSize: "1.2em"
  },
  tableTitle: {
    backgroundColor: "#484848",
    color: "white",
    padding: ".5em 1em",
    height: "50px",
    fontSize: "1.2em"
  },
  adminLinks: {
    color: "#484848",
    "&:hover": {
      color: "blue",
      textDecoration: "none",
      transition: "all .4s ease"
    }
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "center"
  },
  listContainer: {
    flexGrow: 1,
    marginTop: "1rem"
  },
  snackbarRoot: {
    backgroundColor: "#426ff5"
  },
  alertRoot: {
    backgroundColor: "#426ff5"
  },
  alertIcon: {
    color: "yellow"
  }
}));

const AdminMain = () => {
  const classes = useStyles();
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selected, setSelected] = useState("users");
  const history = useHistory();

  useEffect(() => {
    history.push("/admin/" + selected);
  }, []);

  return (
    <>
      <Grid item xs={12} className="admin-view">
        <div className="page-header">
          <div className="page-title">Admin Panel</div>
        </div>
        <div className="page-body">
          <Grid container justifyContent="center">
            <Grid item xs={12} className={classes.tabsContainer}>
              <AdminTabSelector selected={selected} setSelectedTab={setSelected} />
            </Grid>
            <Grid item className={classes.listContainer}>
              <Route path="/admin/users">
                <AdminUsers
                  setSnackbarStatus={setSnackbarStatus}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                />
              </Route>
              <Route path="/admin/products">
                <AdminProducts
                  setSnackbarStatus={setSnackbarStatus}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                />
              </Route>
              <Route path="/admin/orders">
                <AdminOrders
                  setSnackbarStatus={setSnackbarStatus}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                />
              </Route>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Snackbar
        className={classes.snackbarRoot}
        open={snackbarStatus}
        autoHideDuration={4000}
        onClose={() => setSnackbarStatus(false)}
        anchorOrigin={{ vertical: "bottom-right", horizontal: "top-center" }}>
        <Alert
          classes={{
            root: classes.alertRoot,
            icon: classes.alertIcon
          }}
          onClose={() => setSnackbarStatus(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}>
          <div className="snackbar-message">{snackBarMessage}</div>
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminMain;

