import React, { useState, useEffect } from "react";
import MicrophoneVisual from "./MicrophoneVisual";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import ReplayIcon from "@material-ui/icons/Replay";

const useStyles = makeStyles(theme => ({
  container: {},
  controlsDiv: {
    background: "rgba(101,157,189,.8)",
    width: "30%",
    padding: "40px 40px",
    margin: "40px 40px"
  },
  animalsDiv: {},
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

function Creatures() {
  const [imagesArr, setImagesArr] = useState([]);
  const [isLoud, setIsLoud] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quietInterval, setQuietInterval] = useState(3);
  const [loudInterval, setLoudInterval] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    let myTimer = null;

    if (!isLoud && isPlaying) {
      //Classroom is quiet we push a random image from 1 to 35 at quietInterval
      clearInterval(myTimer);

      myTimer = setInterval(() => {
        setCurrentScore(score => (score + 5 > 100 ? 100 : score + 5));
        setImagesArr(images => [
          ...images,
          `/images/image${Math.floor(Math.random() * 35) + 1}.png`
        ]);
      }, quietInterval * 1000);
    } else if (isLoud && isPlaying) {
      //Classroom is loud we start removing the last animal at loudInterval
      clearInterval(myTimer);

      myTimer = setInterval(() => {
        setCurrentScore(score => (score - 5 < 0 ? 0 : score - 5));
        setImagesArr(images => [...images.slice(0, images.length - 1)]);
      }, loudInterval * 1000);
    }

    return () => clearInterval(myTimer);
  }, [isLoud, isPlaying, quietInterval, loudInterval]);

  const handleClick = (e, callback) => {
    callback(bool => !bool);
  };

  const handleOnChange = (event, callback) => {
    callback(event.target.value);
  };

  const resetGame = () => {
    setCurrentScore(0);
    setImagesArr([]);
  };

  const finishGame = () => {
    //TODO: Axios submit highScore
    //TODO: Stop mic
    setCurrentScore(0);
    setImagesArr([]);
  };
  return (
    <div className={classes.container}>
      <div className={classes.controlsDiv}>
        <MicrophoneVisual setIsPlaying={setIsPlaying} setIsLoud={setIsLoud} />
        <TextField
          id="standard-number"
          label="New Animal Timer"
          value={quietInterval}
          onChange={e => handleOnChange(e, setQuietInterval)}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="standard-number"
          label="Remove Animal Timer"
          value={loudInterval}
          onChange={e => handleOnChange(e, setLoudInterval)}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <h2>Current score: {currentScore}</h2>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={resetGame}
        >
          Reset Game
          <ReplayIcon className={classes.rightIcon} />
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={finishGame}
        >
          Finish Game
          <CheckIcon className={classes.rightIcon} />
        </Button>
      </div>
      <div className={classes.animalsDiv}>
        {imagesArr
          ? imagesArr.map((image, index) => (
              <img
                style={{ height: "100px", width: "100px" }}
                key={index}
                src={image}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default Creatures;
