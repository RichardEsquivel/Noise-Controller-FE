import React, { useState } from 'react';
import VolumeAnalyser from './VolumeAnalyser';


const MicrophoneVisual = () => {

	const [audio, setAudio] = useState(null);

	const getMicrophone = async () => {
		const media = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false
		});
		setAudio(media);
	}

	const stopMicrophone = () => {
		audio.getTracks().forEach(track => track.stop());
		setAudio(null);
	}

	const toggleMicrophone = () => {
		if (audio) {
			stopMicrophone();
		} else {
			getMicrophone();
		}
	}

	return (
		<div>
			<button onClick={toggleMicrophone}>{audio ? 'Stop Mic' : 'Start Mic'}</button>
			{audio &&
				<div>
					<VolumeAnalyser audio={audio} />
				</div>
			}
		</div>
	);

}

export default MicrophoneVisual;
