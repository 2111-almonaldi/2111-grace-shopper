import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import { adminUpdateUserThunk, fetchAdminUsers, adminDeleteUserThunk } from "../store/adminInfo";
import AdminUserForm from "./AdminProductForm";
import { useHistory, useLocation } from "react-router-dom";
import { getParam, setParam } from "../utility-funcs/query";
import PaginationUI from "./PaginationUI";

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


const AdminUsers = (props) => {
  const { setSnackbarStatus, setSnackbarMessage, setSnackbarSeverity } = props;
  const classes = useStyles();
  const users = useSelector((state) => state.admin.users);
  const total = useSelector((state) => state.admin.totalUsers);
  const [formName, setFormName] = useState("Default");
  const [dialogStatus, setDialogStatus] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  // const [dialogMode, setDialogMode] = useState("edit");

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
      dispatch(fetchAdminUsers(location));
    }
  }, []);


  useEffect(() => {
    dispatch(fetchAdminUsers(location));
  }, [location.search]);

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table size="sm">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.headerCell}>First Name</TableCell>
              <TableCell className={classes.headerCell}>Last Name</TableCell>
              <TableCell className={classes.headerCell}>Username</TableCell>
              <TableCell className={classes.headerCell}>Email Address</TableCell>
              <TableCell className={classes.headerCell}>Admin</TableCell>
              <TableCell className={classes.headerCell}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.firstName} hover>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>${user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? "Yes": "No"}</TableCell>
                <>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        setSelectedData(user);
                        setDialogStatus(true);
                        setFormName("Edit User");
                      }}
                      classes={{ root: classes.iconButtonRoot }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Delete"
                    onClick={async () => {
                      const success = await dispatch(adminDeleteUserThunk(user));
                      if (success) {
                        setSnackbarMessage(`Deleted: ${user.fullName}`);
                      } else {
                        setSnackbarMessage(`Failed to delete: ${user.fullName}`);
                      }
                      setSnackbarStatus(true);
                    }}>
                    <IconButton classes={{ root: classes.iconButtonRoot }}>
                      <HighlightOffIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </>
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
          <PaginationUI arr={users} total={total} />
        </Grid>
      </Grid>
      <AdminUserForm
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

export default AdminUsers;
