import React from 'react';

const wrapperStyle = {
	width: `200px`,
	height: `200px`,
	background: `rgba(0, 0, 0, 0.2)`
}

const buttonStyle = {
	width: `100px`,
	height: `50px`,
}

const CustomButtonBig = React.forwardRef((props, ref) => {

	return (
		<div style={wrapperStyle}>
			<button ref={ref} style={buttonStyle}>
				Click!
				{props.children}
			</button>
		</div>
	)
})

export default CustomButtonBig;