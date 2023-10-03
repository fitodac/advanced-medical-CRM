import { useContext, useRef } from 'react'
import PropTypes from 'prop-types'


export const InputSearch = ({
	type,
	name,
	placeholder,
	readonly,
	disabled,
	label,
	maxlength,
	minlength,
	className = '',
	containerClassName = '',
	context
}) => {

	const formContext = useContext(context)
	const input = useRef(null)

	const handleChange = e => formContext.handleInputChange(e)

	const handleClear = () => {
		input.current.value = ''
		formContext.handleInputChange({target: {name, value: ''}})
	}

	return (<div className={containerClassName}>
		{ label && (<label className="select-none">{label}</label>) }
		<div className={`input-group-inset`}>
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
				autoComplete="off"
				ref={input}
				/>
			{formContext?.formState[name] && formContext?.formState[name].length
			? (<button 
					type="button" 
					className="btn py-0"
					onClick={handleClear}>
					&times;
				</button>)
			: null}
			
		</div>
	</div>)
}


InputSearch.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
	readonly: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	maxlength: PropTypes.number,
	minlength: PropTypes.number,
	className: PropTypes.string,
	containerClassName: PropTypes.string,
	context: PropTypes.object.isRequired
}