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
import { adminDeleteProductThunk, fetchAdminProducts } from "../store/adminInfo";
import AdminProductForm from "./AdminProductForm"
import { useHistory, useLocation } from "react-router-dom";
import { getParam, setParam } from "../utility-funcs/query";
import PaginationUI from "./PaginationUI";
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
                      const success = await dispatch(adminDeleteProductThunk(product));
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
