import React, { useState, useEffect } from "react";
import MicrophoneVisual from "./MicrophoneVisual";

function Settings() {
	const [highScore, setHighScore] = useState(null);
	const [sensitivity, setSensitivity] = useState(null);
	const [editClassRoom, setEditClassRoom] = useState(false);
	const [classRoomName, setClassRoomName] = useState("My Classrom");






	function handleChange(e) {
		e.persist();
		setClassRoomName(e.target.value);
	}

	const renderClassRoom = () => {
		return (
			<div>
				<p>{classRoomName}</p>


				{/* {!editClassRoom ? (
					<div>
						<p>{classRoomName}</p>
						<button onClick={() => setEditClassRoom(true)}>Edit</button>
					</div>
				) : (
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								name="classroomname"
								value={classRoomName}
								onChange={handleChange}
							/>
							<button type="submit">Edit</button>
						</form>
					)} */}
			</div>
		);
	};

	const renderHighScore = () => {
		return highScore ? <p>High Score: {highScore}</p> : <p>High Score: 0</p>;
	};

	//Need some changes on Microphonevisual and volume analyzer, to make it work for settings
	return (
		<div>
			<h1>Profile</h1>
			{renderClassRoom()}
			<MicrophoneVisual />
			{renderHighScore()}
		</div>
	);
}

export default Settings;
