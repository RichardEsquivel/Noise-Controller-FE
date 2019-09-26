import React from "react";
import { Slider } from "@material-ui/core";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

//Utilizes Material UI Styles as a HOC
const styles = {
  root: {
    width: 200
  },
  slider: {
    width: "100%",
    margin: "0 auto",
    padding: "18px 0px"
  }
};

const marks = [
  {
    value: 80,
    label: "Really quiet"
  },
  {
    value: 120,
    label: ""
  },
  {
    value: 150,
    label: ""
  },
  {
    value: 180,
    label: ""
  },
  {
    value: 210,
    label: ""
  },
  {
    value: 240,
    label: ""
  },
  {
    value: 270,
    label: "You can talk"
  }
];

//We will pass the audio stream to this component via props analyze the audio stream and store that in state
class VolumeAnalyser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioData: new Uint8Array(0),
      maxVol: 140,
      violations: 0,
      threshDescr: "Shhhhhhh"
    };
  }
  //when component mounts set up Audio Context
  componentDidMount() {
    if (this.props.audio) {
      console.log(this.props.audio);
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.source = this.audioContext.createMediaStreamSource(this.props.audio);
      this.source.connect(this.analyser);
      this.tick();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.audio !== prevProps.audio && this.props.updateVolA) {
      console.log(prevProps);
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.source = this.audioContext.createMediaStreamSource(this.props.audio);
      this.source.connect(this.analyser);
      this.tick();
      if (this.props.setUpdateVolA) this.props.setUpdateVolA(true);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  tick = () => {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
    if (Math.max.apply(Math, this.state.audioData) > this.state.maxVol) {
      this.setState({ violations: this.state.violations + 1 });
      if (this.props.setIsLoud) this.props.setIsLoud(true);
    } else {
      if (this.props.setIsLoud) this.props.setIsLoud(false);
    }
  };
  //Setting up state values that can be utilized based on Slider and microphone input to appearance of creatures
  handleChange = (e, value) => {
    this.setState(
      {
        maxVol: value
      },
      () => {
        if (this.state.maxVol < 120) {
          this.setState({ threshDescr: "Shhhhhhh" });
        } else if (this.state.maxVol >= 120 && this.state.maxVol < 150) {
          this.setState({ threshDescr: "Inside voice" });
        } else if (this.state.maxVol >= 150 && this.state.maxVol < 180) {
          this.setState({ threshDescr: "Animated voices" });
        } else if (this.state.maxVol >= 180 && this.state.maxVol < 210) {
          this.setState({ threshDescr: "Simmer down now!" });
        } else if (this.state.maxVol >= 210 && this.state.maxVol < 240) {
          this.setState({ threshDescr: "No one can hear you scream" });
        } else if (this.state.maxVol > 240) {
          this.setState({ threshDescr: "Hand me my tin ear." });
        }
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Typography id="continuous-slider" gutterBottom>
            Volume Threshold
          </Typography>
          <Grid container spacing={1}>
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: "12px"
              }}
            >
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider
                className={classes.slider}
                value={this.state.maxVol}
                aria-labelledby="continuous-slider"
                onChange={this.handleChange}
                min={80}
                max={270}
                marks={marks}
                valueLabelDisplay="on"
              />
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: "12px"
              }}
            >
              <VolumeUp />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(VolumeAnalyser);
