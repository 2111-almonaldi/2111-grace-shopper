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
import { adminUpdateUserThunk } from "../store/adminInfo";
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

const AdminUserForm = (props) => {
  const classes = useStyles(props)
  const { errors } = props
  const {
    user,
    dialogStatus,
    setDialogStatus,
    setSnackbarStatus,
    setSnackbarMessage,
    formName
  } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    setFormState({...formState, ...user });
  }, [user])

  const [formState, setFormState] = useState({
    firstName: this.state.firstName ? this.state.firstName : "",
    lastName: this.state.lastName ? this.state.lastName : "",
    fullName: this.state.firstName + " " + this.state.lastName,
    username: this.state.username ? this.state.username : "",
    email: this.state.email ? this.state.email : "",
    isAdmin: false,
    errors: {
      firstName: false,
      lastName: false,
      username: false,
      email: false,
      isAdmin: false
    }
  });

  useEffect(() => {
    let newState = { ...formState, ...user };
    setFormState(newState)
  }, [user]);

  const handleChange = (evt) => {
    const newState = { ...formState }
    newState[evt.target.name] = evt.target.value
    setFormState(newState)
  }


  const handleClick = async (user) => {
    const success = await dispatch(adminUpdateUserThunk(user))
    if (success) setSnackbarMessage(" Update Success!")
    else setSnackbarMessage("Update Error")

    setSnackbarStatus(true);
    setDialogStatus(false);
  }

  if (!user) {
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
              label= "Username"
              type="text"
              variant="outlined"
              fullWidth
              value={formState.username}
              name="username"
              onChange={handleChange}
              error={formState.errors.username}
              helperText={formState.errors.username ? formState.errors.username : false}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                margin="dense"
                label= "Email Address"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.firstName}
                name="Email Address"
                onChange={handleChange}
                error={formState.errors.email}
                helperText={formState.errors.email ? formState.errors.email : false}
              />
          <Grid item xs={12}>
            <TextField
                margin="dense"
                label= "First Name"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.firstName}
                name="firstName"
                onChange={handleChange}
                error={formState.errors.firstName}
                helperText={formState.errors.firstName ? formState.errors.firstName : false}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                margin="dense"
                label= "Last Name"
                type="text"
                variant="outlined"
                fullWidth
                value={formState.lastName}
                name="lastName"
                onChange={handleChange}
                error={formState.errors.lastName}
                helperText={formState.errors.lastName ? formState.errors.lastName : false}
              />
          </Grid>
          <FormControl variant="outlined" className={classes.formControlRoot} margin="dense">
              <InputLabel id="isAdmin">Admin Status</InputLabel>
              <Select
                labelId="isAdmin"
                label="Admin Status"
                fullWidth
                value={formState.isAdmin}
                name="isAdmin"
                onChange={handleChange}
                error={formState.errors.isAdmin}
                helperText={formState.errors.isAdmin ? formState.errors.isAdmin : false}>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
        </Grid>
      </Grid>
    </DialogContent>
        <DialogActions>
          <div className="buttons">
            <Button
              classes={{ root: classes.addButton, label: classes.buttonLabel }}
              onClick={() => handleClick(user, formState)}>
              Update
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


export default AdminUserForm
