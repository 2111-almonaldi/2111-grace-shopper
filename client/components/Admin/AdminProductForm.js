import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles/";
import { useDispatch } from "react-redux";
import { adminAddProductThunk, adminUpdateProductThunk } from "../../store/adminInfo";
import {getErrors, resetErrors} from "../../store/errors";
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
    fontFamily: "Helvetica"
  },
  formControlRoot: {
    width: "90%",
  }
}));

const AdminProductForm = (props) => {
  const classes = useStyles(props)
  const { errors } = props
  const {dialogMode} = props;
  const {
    product,
    dialogStatus,
    setDialogStatus,
    setSnackbarStatus,
    setSnackbarMessage,
    formName
  } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    setFormState({...formState, ...product });
  }, [product])

  const [formState, setFormState] = useState({
    name : this.state.name ? this.state.name : "",
    price : this.state.price ? this.state.price : "",
    imageUrl : this.state.imageUrl? this.state.imageUrl : "",
    quantity : this.state.quantity ? this.state.quantity : "",
    description : this.state.description ? this.state.description : "",
    errors: {
      name: false,
      price: false,
      quanity: false,
      description: false
    }
  });

  useEffect(() => {
    let newState = { ...formState, ...product };
    setFormState(newState)
  }, [product]);

  const handleChange = (evt) => {
    const newState = { ...formState }
    newState[evt.target.name] = evt.target.value
    setFormState(newState)
  }

  const handleClick = async (product) => {
    const storeThunk = () => {
      if ( dialogMode === 'edit') {
      () => dispatch(adminUpdateProductThunk(product, formState))
      } else {
        () => dispatch(adminAddProductThunk(product, formState))
      }
    }
    const success = await storeThunk()
    if (success) setSnackbarMessage(" Submission Success!")
    else setSnackbarMessage("Submission Error")

    setSnackbarStatus(true);
    setDialogStatus(false);
  }

  if (!product) {
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
              label= "Movie Name"
              type="text"
              variant="outlined"
              fullWidth
              value={formState.name}
              name="name"
              onChange={handleChange}
              error={formState.errors.name}
              helperText={formState.errors.name ? formState.errors.name : false}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                margin="dense"
                label= "Price ($)"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.price} // @@ call out to change price to pennies for all components
                name="price"
                onChange={handleChange}
                error={formState.errors.price}
                helperText={formState.errors.price ? formState.errors.price : false}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                margin="dense"
                label= "Inventory (U)"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.quantity}
                name="quantity"
                onChange={handleChange}
                error={formState.errors.quantity}
                helperText={formState.errors.quantity ? formState.errors.quantity : false}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                margin="dense"
                label= "Image Url"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.imageUrl}
                name="imageUrl"
                onChange={handleChange}
                error={formState.errors.imageUrl}
                helperText={formState.errors.imageUrl ? formState.errors.imageUrl : false}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Description"
              type="text"
              variant="outlined"
              fullWidth
              multiline
              value={formState.description}
              name="description"
              onChange={handleChange}
              error={!!formState.errors.description}
              helperText={formState.errors.description ? formState.errors.description : false}
            />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <div className="buttons">
            <Button
              classes={{ root: classes.addButton, label: classes.buttonLabel }}
              onClick={() => handleClick(product, formState)}>
                {dialogMode === "edit" ? "Update" : "Add" }
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


export default AdminProductForm
