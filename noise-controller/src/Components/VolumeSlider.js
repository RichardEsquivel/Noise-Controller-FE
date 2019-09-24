import React from 'react';

class VolumeSlider extends React.Component {
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
	}

	render() {
		return <canvas width="280" height="280" ref={this.canvas} />;
	}
}

export default VolumeSlider;