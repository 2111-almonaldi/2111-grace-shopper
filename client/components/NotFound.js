/* eslint-disable linebreak-style */
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {makeStyles} from "@mui/styles/";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const useStyles = makeStyles((theme) => ({
  notFoundBody: {
    width: "80%",
    margin: "0 auto 0 auto",
    backgroundColor: "#30b2e6",
    display: "flex",
    justifyContent: "space-round",
    alignItems: "center"
  },
  notFoundButton: {
    backgroundColor: "#fc032c",
    color: "white",
    fontWeight: "bold",
    "&:hover" : {
      backgroundColor: "#fcf003"
    }

  },
  icon: {
    transform: "rotate(30deg)",
    color: "black"
  }

}))

const NotFound = ({ error, message }) => {
  if (!error) error = 404;
  if (!message) message = "PAGE NOT FOUND!"
  const styles = useStyles()
  return (
      <div className="not-found-page">
        <Grid container direction="row" wrap="nowrap" justifyContent="center" alignItems="center">
          <PriorityHighIcon style={{ fontSize: 250 }} className={styles.icon} />
            <div className={styles.notFoundBody}>
              <Button
                variant="contained"
                component={RouterLink}
                to="/home"
                className={styles.notFoundButton}>
                  <span className="not-found-button">Back To Home Page</span>
              </Button>
              <div>
              <img src="../images/not-found.jpg" />
              </div>
            </div>
        </Grid>
    </div>
  )
}

export default NotFound;
