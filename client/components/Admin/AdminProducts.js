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
import { adminDelProductThunk, fetchAdminProducts } from "../../store/adminInfo";
import AdminProductForm from "./AdminProductForm"
import { useHistory, useLocation } from "react-router-dom";
import { getParam, setParam } from "../../queryFunctions/queryParam";
import PaginationUI from "../PaginationUI";
import { FETCH_PENDING, FETCH_ERROR } from "../../../constants";

const useStyles = makeStyles({
  addButton: {
    backgroundColor: "#fc9d03",
    color: "white",
    fontWeight: "bold",
    "&:hover" : {
      backgroundColor: "#fcf003"
    }
  },
  deleteButton: {
    backgroundColor: "#fc032c",
    color: "white",
    fontWeight: "bold",
    "&:hover" : {
      backgroundColor: "#fcf003"
    }
  },
  buttonLabel: {
    fontFamily: "Courier"
  },
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


const AdminProducts = (props) => {
  const { setSnackbarStatus, setSnackbarMessage, setSnackbarSeverity } = props;
  const classes = useStyles();

  const products = useSelector((state) => state.admin.products) || [];
  const total = useSelector((state) => state.admin.totalProducts);
  const [formName, setFormName] = useState("Default");
  const [dialogStatus, setDialogStatus] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [dialogMode, setDialogMode] = useState("edit");
  const fetchStatus = useSelector((state) => state.admin.getProductsStatus)

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
      dispatch(fetchAdminProducts(location));
    }
  }, []);


  useEffect(() => {
    dispatch(fetchAdminProducts(location));
  }, [location.search]);

  if (fetchStatus === FETCH_PENDING ) {
    return (
      <div className="loading">Loading :{products}!</div>

    )
  } else if (fetchStatus === FETCH_ERROR ) {
    return (
      <div className="errors">Error Loading: {products}!</div>
    )
  } else


  return (
    <React.Fragment>
      <div className="buttons">
        <Button
          classes={{ root: classes.addButton, label: classes.buttonLabel }}
          onClick={() => {
            setSelectedData({});
            setDialogStatus(true);
            setFormName("Create New Movie");
            setDialogMode("add");
          }}>
          Create New Movie
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table size="sm">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.headerCell}>Movie</TableCell>
              <TableCell className={classes.headerCell}>Price</TableCell>
              <TableCell className={classes.headerCell}>Quantity</TableCell>
              <TableCell className={classes.headerCell}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        setSelectedData(product);
                        setDialogMode("edit");
                        setDialogStatus(true);
                        setFormName("Edit Current Movie");
                      }}
                      classes={{ root: classes.iconButtonRoot }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Delete"
                    onClick={async () => {
                      const success = await dispatch(adminDelProductThunk(product));
                      if (success) {
                        setSnackbarMessage(`Deleted: ${product.name}`);
                      } else {
                        setSnackbarMessage(`Failed to delete: ${product.name}`);
                      }
                      setSnackbarStatus(true);
                    }}>
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
          <PaginationUI arr={products} total={total} />
        </Grid>
      </Grid>
      <AdminProductForm
        dialogMode={dialogMode}
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

export default AdminProducts;
