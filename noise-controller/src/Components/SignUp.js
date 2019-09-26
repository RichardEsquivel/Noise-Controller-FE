import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  container: {
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "800px",
    textAlign: "center",
    padding: "20px 40px",
    background: "rgba(101,157,189,1)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  },
  divider: {
    borderTop: "1px solid grey"
  }
}));

const SignUp = props => {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
    classname: ""
  });
  const classes = useStyles();

  const handleChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("https://noisecontroller.herokuapp.com/api/auth/register", creds)
      .then(response => {
        props.history.push("/login");
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <div className={classes.container}>
      <h1 style={{ color: "white" }}>Welcome to Noise Controller!</h1>
      <Divider className={classes.divider} />
      <h2 style={{ color: "white" }}>Register an account</h2>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="outlined-name"
          label="Username"
          name="username"
          className={classes.textField}
          value={creds.username}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          type="password"
          label="Password"
          name="password"
          className={classes.textField}
          value={creds.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-classroom"
          label="Classroom Name"
          name="classname"
          className={classes.textField}
          value={creds.classname}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};
export default SignUp;
