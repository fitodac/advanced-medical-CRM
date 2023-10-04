import { useContext } from 'react'
import PropTypes from 'prop-types'


export const Input = ({
	type,
	name,
	placeholder,
	readonly,
	disabled,
	label,
	maxlength,
	minlength,
	className,
	context
}) => {

	const formContext = useContext(context)

	const handleChange = e => formContext.handleInputChange(e)

	return (<div className="">
		{ label && (<label className="select-none leading-tight block">{label}</label>) }
		<input 
			type={type ?? 'text'} 
			name={name} 
			defaultValue={formContext?.formState[name]}
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