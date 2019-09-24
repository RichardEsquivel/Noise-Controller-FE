import React from 'react';
import VolumeSlider from './VolumeSlider';

import VolumeAnalyser from './VolumeAnalyser'

class Creatures extends React.Component {
	constructor() {
		super()
		this.state = {
			audio: null
		}
	}

	getMicrophone = async () => {
		const audio = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false
		})
		this.setState({ audio })
	}

	stopMicrophone = () => {
		this.state.audio.getTracks().forEach(track => track.stop());
		this.setState({ audio: null });
	}

	toggleMicrophone = () => {
		if (this.state.audio) {
			this.stopMicrophone();
		} else {
			this.getMicrophone();
		}
	}

	render() {
		return (
			<div>
				<button onClick={this.toggleMicrophone}>{this.state.audio ? 'Stop Mic' : 'Start Mic'}</button>
				{this.state.audio &&
					<div>
						<VolumeAnalyser audio={this.state.audio} />
					</div>
				}
			</div>
		);
	}
}

export default Creatures;
