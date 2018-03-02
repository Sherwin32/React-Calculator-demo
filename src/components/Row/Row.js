import React from 'react';
import Button from '../Button/Button'
import './Row.css'

const Row = (props) => {
	let buttons = props.btns.map(btn => (
			<Button 
				val={btn.val} 
				type={btn.type} 
				click={props.click}
				key={btn.val} />
		))
	return(
		<div className='Row'>
			{buttons}
		</div>
	)
}

export default Row;