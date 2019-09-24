import React, { useState, useEffect } from "react";
import MicrophoneVisual from './MicrophoneVisual';

function Creatures() {
	const [imagesArr, setImagesArr] = useState([]);
	const [isLoud, setIsLoud] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [quietInterval, setQuietInterval] = useState(3000);
	const [loudInterval, setLoudInterval] = useState(1000);
	const [currentScore, setCurrentScore] = useState(0);

	useEffect(() => {
		let myTimer = null;

		if (!isLoud && isPlaying) {
			//Classroom is quiet we push a random image from 1 to 35 at quietInterval
			clearInterval(myTimer);

			myTimer = setInterval(() => {
				setCurrentScore(score => (score + 10 > 100 ? 100 : score + 10));
				setImagesArr(images => [
					...images,
					`/images/image${Math.floor(Math.random() * 35) + 1}.png`
				]);
			}, quietInterval);
		} else if (isLoud && isPlaying) {
			//Classroom is loud we start removing the last animal at loudInterval
			clearInterval(myTimer);

			myTimer = setInterval(() => {
				setCurrentScore(score => (score - 10 < 0 ? 0 : score - 10));
				setImagesArr(images => [...images.slice(0, images.length - 1)]);
			}, loudInterval);
		}

		return () => clearInterval(myTimer);
	}, [isLoud, isPlaying, quietInterval, loudInterval]);

	const handleClick = (e, callback) => {
		callback(bool => !bool);
	};

	const handleOnChange = (event, callback) => {
		callback(event.target.value);
	};

	return (
		<div>
			<div>
				<MicrophoneVisual setIsPlaying={setIsPlaying} setIsLoud={setIsLoud} />
				<button onClick={e => handleClick(e, setIsPlaying)}>{`Set Play to ${
					isPlaying ? "false" : "true"
					}`}</button>
				<button onClick={e => handleClick(e, setIsLoud)}>{`Set isLoud to ${
					isLoud ? "false" : "true"
					}`}</button>
				<label htmlFor="quietInterval">Quiet Interval (ms): </label>
				<input
					id="quietInterval"
					type="text"
					value={quietInterval}
					onChange={e => handleOnChange(e, setQuietInterval)}
				/>
				<label htmlFor="loudInterval">Loud Interval (ms): </label>
				<input
					id="loudInterval"
					type="text"
					value={loudInterval}
					onChange={e => handleOnChange(e, setLoudInterval)}
				/>
				<h2>Current score: {currentScore}</h2>
				<button onClick={() => setCurrentScore(0)}>Reset Score</button>
				<button onClick={() => setImagesArr([])}>Reset Animals</button>
			</div>
			{imagesArr
				? imagesArr.map((image, index) => (
					<img
						style={{ height: "200px", width: "200px" }}
						key={index}
						src={image}
					/>
				))
				: null}
		</div>
	);
}

export default Creatures;
