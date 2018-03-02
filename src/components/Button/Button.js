import React from 'react';
import './Button.css'

const Button = (props) => {
	let buttonClassName = 'Button';
	if(props.val === 0){
		buttonClassName += ' zeroButton';
	}
	return(
		<div className={buttonClassName} onClick={() => props.click(props.val, props.type)}>
			<div className="content">{props.val}</div>
		</div>
	)
}

export default Button;