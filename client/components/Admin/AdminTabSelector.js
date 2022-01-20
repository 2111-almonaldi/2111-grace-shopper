import React, {useState} from "react";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@mui/styles/";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400
  }
});


const AdminTabSelector = (props) => {
  const {selected, setSelected} = props
  const classes = useStyles();
  const [value, setValue] = useState(0)
  const history = useHistory()

  const handleClick = (evt, newValue) => {
    const target = evt.target.innerText.toLowerCase()
    setValue(newValue)
    setSelected(target)
    history.push("/admin/" + target)
  }

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleClick}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example">
          <Tab icon={<AdminPanelSettingsIcon />} label="Admin Panel" />
          <Tab icon={<PeopleAltIcon />} label="Users" />
          <Tab icon={<MonetizationOnIcon />} label="Orders" />
          <Tab icon={<AddShoppingCartIcon />} label="Products" />
        </Tabs>
    </Paper>
  )
}

export default AdminTabSelector;
