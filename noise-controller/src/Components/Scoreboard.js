import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import axiosWithAuth from "../utils/axiosWithAuth";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "rgba(101,157,189,1)",
    padding: "10px 0",
    minWidth: "600px",
    minHeight: "400px",
    maxHeight: "800px",
    textAlign: "center",
    overflow: "auto"
  },
  fonts: {
    fontSize: "1.3rem"
  }
}));

function Scoreboard() {
  const [scores, setScores] = useState([]);
  const [classId, setClassId] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    axiosWithAuth()
      .get(`https://noisecontroller.herokuapp.com/api/classes/`)
      .then(response => {
        setClassId(response.data[0].id);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axiosWithAuth()
      .get(
        `https://noisecontroller.herokuapp.com/api/classes/${classId}/scores`
      )
      .then(res => setScores(res.data))
      .catch(err => console.error(err));
  }, [classId]);

  return (
    <div className={classes.root}>
      <h2 style={{ color: "white", fontSize: "2rem" }}>Your High Scores</h2>
      {scores.length > 0 ? (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.fonts}>
                Date
              </TableCell>
              <TableCell align="center" className={classes.fonts}>
                High Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map((score, index) => (
              <TableRow key={index}>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  className={classes.fonts}
                >
                  {score.date}
                </TableCell>
                <TableCell align="center" className={classes.fonts}>
                  {score.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No scores to display</p>
      )}
    </div>
  );
}

export default Scoreboard;
