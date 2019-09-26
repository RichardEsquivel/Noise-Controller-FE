import React, { useState } from 'react';
import VolumeAnalyser from './VolumeAnalyser';


const MicrophoneVisual = ({ setIsPlaying, setIsLoud }) => {

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

	const startGame = () => {
		setIsPlaying(true)
	}

	const stopGame = () => {
		setIsPlaying(false)
	}

	const toggleGame = () => {
		if (setIsPlaying) {
			stopGame()
		} else {
			startGame()
		}
	}



	return (
		<div>
			<button onClick={toggleMicrophone}>{audio ? 'Stop Mic' : 'Start Mic'}</button>
			<button onClick={toggleGame}>Game!</button>
			{audio &&
				<div>
					<VolumeAnalyser audio={audio} setIsLoud={setIsLoud} />
				</div>
			}
		</div>
	);

}

export default MicrophoneVisual;
