import React from 'react';

const wrapperStyle = {
	width: `200px`,
	height: `200px`,
	background: `rgba(0, 0, 0, 0.2)`,
}

const CustomButton = (props) => {
	const refWithoutForwardRef = props.simpleRef;

	return (
		<div style={wrapperStyle}>
			<button ref={refWithoutForwardRef}>
				Click!
				{props.children}
			</button>
		</div>
	)
}

export default CustomButton;