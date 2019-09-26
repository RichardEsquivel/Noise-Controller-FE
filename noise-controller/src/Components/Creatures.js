import React, { useState, useEffect } from "react";
import MicrophoneVisual from "./MicrophoneVisual";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import ReplayIcon from "@material-ui/icons/Replay";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import "./Creatures.css";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    position: "relative",
    width: "100%"
  },
  boxDiv: {
    background: "rgba(101,157,189,.8)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "25%",
    padding: "20px 20px",
    position: "relative"
  },

  box1: {
    height: "400px"
  },
  box2: {
    height: "520px"
  },
  box3: {
    height: "520px"
  },
  animalsDiv: {
    margin: "40px 40px",
    width: "100%"
  },
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
  },
  span: {
    fontWeight: "bold",
    color: "#3E51B4"
  },
  expandButton: {
    position: "absolute",
    bottom: "0",
    left: "50%",
    fontSize: "12px",
    color: "grey",
    cursor: "pointer",
    transform: "translate(-50%)",
    color: "black"
  }
}));

function Creatures() {
  const [imagesArr, setImagesArr] = useState([]);
  const [isLoud, setIsLoud] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quietInterval, setQuietInterval] = useState(3);
  const [loudInterval, setLoudInterval] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [expandButton1, setExpandButton1] = useState(false);
  const [expandButton2, setExpandButton2] = useState(false);
  const [expandButton3, setExpandButton3] = useState(false);

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

  const toggleGame = () => {
    setStartGame(bool => !bool);
  };

  const finishGame = () => {
    //TODO: Axios submit highScore
    setStartGame(false);
    setCurrentScore(0);
    setImagesArr([]);
  };

  const collapse = (e, box, cb) => {
    let div = document.querySelector(box);
    div.classList.toggle("close");
    cb(bool => !bool);
  };

  const renderControls = () => {
    return (
      <>
        <div>
          <h2>Game Controls</h2>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={toggleGame}
        >
          {startGame ? "Stop Game" : "Start Game"}
          {startGame ? (
            <StopIcon className={classes.rightIcon} />
          ) : (
            <PlayArrowIcon className={classes.rightIcon} />
          )}
        </Button>
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
        <h2>Current score: {currentScore}</h2>
        <span
          className={classes.expandButton}
          onClick={e => collapse(e, ".box1", setExpandButton1)}
        >
          {expandButton1 ? "Expand" : "Collapse"}
        </span>
      </>
    );
  };

  const renderInstructions = () => {
    return (
      <>
        <div>
          <h2>Learn More</h2>
        </div>
        <p>
          Click <span className={classes.span}>Start Game</span> so the browser
          can start the feed from your microphone (You must allow permission for
          the game to start). You are able to{" "}
          <span className={classes.span}>Stop Game</span> to pause animals,
          score and turn the microphone off.
          <span className={classes.span}>Reset Game</span> will continue to run
          the game but will reset animals and scores. You can click{" "}
          <span className={classes.span}>Finish Game</span> to stop the game and
          submit your score.
        </p>
        <p>
          Set the volume threshold, the lower the volume the quieters the
          children will have to be so animals start appearing.
        </p>
        <p>
          A random new animal will at every{" "}
          <span className={classes.span}>New Animal Timer</span> as long as
          children do not exceed the volume threshold
        </p>
        <p>
          The last added animal will disappear when the children exceed the
          volume threshold and hold it for{" "}
          <span className={classes.span}>Remove Animal Timer</span>
        </p>
        <span
          className={classes.expandButton}
          onClick={e => collapse(e, ".box3", setExpandButton3)}
        >
          {expandButton3 ? "Expand" : "Collapse"}
        </span>
      </>
    );
  };

  const renderTimerAndVolume = () => {
    return (
      <>
        <div>
          <h2>Timer and Volume Controls</h2>
        </div>
        <MicrophoneVisual
          setIsPlaying={setIsPlaying}
          setIsLoud={setIsLoud}
          startGame={startGame}
        />
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
        <span
          className={classes.expandButton}
          onClick={e => collapse(e, ".box2", setExpandButton2)}
        >
          {expandButton2 ? "Expand" : "Collapse"}
        </span>
      </>
    );
  };

  return (
    <div className={classes.container}>
      <div className={`${classes.boxDiv} box1`}>{renderControls()}</div>
      <div className={`${classes.boxDiv} box2`}>{renderTimerAndVolume()}</div>
      <div className={`${classes.boxDiv} box3`}>{renderInstructions()}</div>

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
