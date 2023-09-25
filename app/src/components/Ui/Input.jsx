import { useContext, useState } from 'react'
import PropTypes from 'prop-types'

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
	readonly: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	maxlength: PropTypes.number,
	minlength: PropTypes.number,
	className: PropTypes.string,
	context: PropTypes.object.isRequired
}

export default function Input(props){

	const context = useContext(props.context)

	const {
		type,
		name,
		placeholder,
		readonly,
		disabled,
		label,
		maxlength,
		minlength,
		className
	} = props

	const handleChange = e => {
		context.handleInputChange(e)
	}

	return (<div className="">
		{ label ? (<label className="select-none">{label}</label>) : null }
		<input 
			type={type ?? 'text'} 
			name={name} 
			defaultValue={context.formState[name]}
			onChange={handleChange}
			placeholder={placeholder}
			readOnly={readonly}
			disabled={disabled}
			minLength={minlength} 
			maxLength={maxlength} 
			className={className}
			/>
	</div>)
}