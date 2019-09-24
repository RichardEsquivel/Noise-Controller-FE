import React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from 'material-ui/core/styles';

//Uitlizes Material UI Styles as a HOC
const styles = {
	root: {
		width: 200,
	},
	slider: {
		'margin-top': '80px',
		width: '75%',
		margin: '0 auto',
		padding: '18px 0px',
	},
};

//We will pass the audio stream to this component via props analyze the audio stream and store that in state
class VolumeAnalyser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			audioData: new Uint8Array(0),
			maxVol: 140,
			violations: 0,
			threshDescr: 'Shhhhhhh'
		};
	}
	//when component mounts set up Audio Context
	componentDidMount() {
		this.audioContext = new (window.AudioContext ||
			window.webkitAudioContext)();
		this.analyser = this.audioContext.createAnalyser();
		this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
		this.source = this.audioContext.createMediaStreamSource(this.props.audio);
		this.source.connect(this.analyser);
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
			this.setState({
				violations: this.state.violations + 1
			})
		}
	}

	handleChange = (e, value) => {
		this.setState({
			maxVol: value
		}, () => {
			if (this.state.maxVol < 145) {
				this.setState({ threshDescr: 'Shhhhhhh' })
			}
			else if (this.state.maxVol > 140 && this.state.maxVol < 160) {
				this.setState({ threshDescr: 'Inside voice' })
			}
			else if (this.state.maxVol > 160 && this.state.maxVol < 210) {
				this.setState({ threshDescr: 'Animated voices' })
			}
			else if (this.state.maxVol > 210 && this.state.maxVol < 260) {
				this.setState({ threshDescr: 'Simmer down now!' })
			}
			else if (this.state.maxVol > 260 && this.state.maxVol < 300) {
				this.setState({ threshDescr: 'No one can hear you scream' })
			}
			else if (this.state.maxVol > 300) {
				this.setState({ threshDescr: 'Hand me my tin ear.' })
			}
		})
	}

	render() {
		const { classes } = this.props

		return (
			<>
				<div>Try to keep it down okay? {this.state.violations}</div>
				<div>Threshold: {this.state.threshDescr} </div>

				<Slider
					className={classes.slider}
					value={this.state.maxVol}
					aria-labelledby="label"
					onChange={this.handleChange}
					min={145}
					max={300}
				/>
				<div className='levels'>

				</div>
			</>
		)
	}

}

export default withStyles(styles)(VolumeAnalyser);