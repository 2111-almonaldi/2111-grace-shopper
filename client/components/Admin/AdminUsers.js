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
import { fetchAdminUsers, adminDelUserThunk } from "../../store/adminInfo";
import AdminUserForm from "./AdminUserForm";
import { useHistory, useLocation } from "react-router-dom";
import { getParam, setParam } from "../../queryFunctions/queryParam";
import PaginationUI from "../PaginationUI";
import { FETCH_PENDING, FETCH_ERROR} from "../../../constants";

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
  const fetchStatus = useSelector((state) => state.admin.getUsersStatus)

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

  if (fetchStatus === FETCH_PENDING ) {
    return (
      <div className="loading">Loading :{users}!</div>

    )
  } else if (fetchStatus === FETCH_ERROR ) {
    return (
      <div className="errors">Error Loading: {users}!</div>
    )
  } else

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
              <TableRow key={user.id} hover>
                <TableCell>{user.firstName}</TableCell>
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
                      const success = await dispatch(adminDelUserThunk(user));
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
