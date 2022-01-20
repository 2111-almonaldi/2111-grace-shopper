import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { TextareaAutosize } from "@material-ui/core/TextareaAutosize";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { adminUpdateOrderThunk } from "../store/adminInfo";
import {getErrors, resetErrors} from "../store/errors";

const useStyles = makeStyles((theme) => ({
  addButton: {
    backgroundColor: "#008000",
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
  formControlRoot: {
    width: "90%",
  }
}));

const AdminOrderForm = (props) => {
  const classes = useStyles(props)
  const { errors } = props
  const {
    order,
    dialogStatus,
    setDialogStatus,
    setSnackbarStatus,
    setSnackbarMessage,
    formName
  } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    setFormState({...formState, ...order });
  }, [order])

  const [formState, setFormState] = useState({
    status : this.state.status ? this.state.status : "",
    subTotal : this.state.subTotal ? this.state.subTotal : "",
    orderQty : this.state.orderQty ? this.state.orderQty : "",
    orderNumber: this.state.orderNumber ? this.state.orderNumber : "",
    customerEmail: this.state.customerEmail? this.state.customerEmail : "",
    errors: {
      status: false,
      subTotal: false,
      orderQty: false,
      orderNumber: false,
      customerEmail: false
    }
  });

  useEffect(() => {
    let newState = { ...formState, ...order };
    setFormState(newState)
  }, [order]);

  const handleChange = (evt) => {
    const newState = { ...formState }
    newState[evt.target.name] = evt.target.value
    setFormState(newState)
  }

  const handleClick = async (order) => {

    const success = await dispatch(adminUpdateOrderThunk(order))
    if (success) setSnackbarMessage("Update Success!")
    else setSnackbarMessage("Update Error")

    setSnackbarStatus(true);
    setDialogStatus(false);
  }

  if (!order) {
    dispatch(getErrors(errors))
    return null;
  }
  else dispatch(resetErrors(errors))

return (
  <div>
    <Dialog
      open={dialogStatus}
      onClose={() => setDialogStatus(false)}
      aria-labelledby="form-dialog-name">
      <DialogTitle id="form-dialog-name">{formName}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label= "Order Number"
              type="text"
              variant="outlined"
              fullWidth
              value={formState.orderNumber}
              name="orderNumber"
              onChange={handleChange}
              error={formState.errors.orderNumber}
              helperText={formState.errors.orderNumber ? formState.errors.orderNumber : false}
            />
          </Grid>
          <FormControl variant="outlined" className={classes.formControlRoot} margin="dense">
              <InputLabel id="status">Order Status</InputLabel>
              <Select
                labelId="status"
                label="Order Status"
                fullWidth
                value={formState.status}
                name="status"
                onChange={handleChange}
                error={formState.errors.status}
                helperText={formState.errors.status ? formState.errors.status : false}>
                <MenuItem value="PROCESSING">Processing</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="CANCELLED">Canceled</MenuItem>
              </Select>
            </FormControl>
          <Grid item xs={12}>
            <TextField
                margin="dense"
                label= "SubTotal ($)"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.subTotal}
                onChange={handleChange}
                error={formState.errors.subTotal}
                helperText={formState.errors.subTotal ? formState.errors.subTotal : false}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                margin="dense"
                label= "OrderQty"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.quanity}
                name="Total Items"
                onChange={handleChange}
                error={formState.errors.orderQty}
                helperText={formState.errors.orderQty? formState.errors.orderQty : false}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                margin="dense"
                label= "Customer Email"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.customerEmail}
                name="customerEmail"
                onChange={handleChange}
                error={formState.errors.customerEmail}
                helperText={formState.errors.customerEmail ? formState.errors.customerEmail : false}
              />
          </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <div className="buttons">
            <Button
              classes={{ root: classes.addButton, label: classes.buttonLabel }}
              onClick={() => handleClick(order, formState)}>
            </Button>
            <Button
              classes={{ root: classes.deleteButton, label: classes.buttonLabel }}
              onClick={() => setDialogStatus(false)}>
              Cancel
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}


export default AdminOrderForm
