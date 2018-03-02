import React from 'react';
import './NumberDisplay.css'

const NumberDisplay = (props) => (
	<div className='NumberDisplay'>
		<span>{props.display}</span>
	</div>
)

export default NumberDisplay;