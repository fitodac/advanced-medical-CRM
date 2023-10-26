import { useContext, useRef } from 'react'
import PropTypes from 'prop-types'


const mask = (val, event) => {
  if (!val) return ''

	val = String(val).replace(/\D/g, '')

	if( val.length === 2 ){
		const day = Math.min(parseInt(val.substring(0, 2), 10), 31)
		val = day.toString().padStart(2, '0') + val.substring(2)
	}

	if( val.length === 4 ){
		const month = Math.min(parseInt(val.substring(2, 4), 10), 12)
		val = val.substring(0, 2) + month.toString().padStart(2, '0') + val.substring(4)
	}

	if( val.length >= 2 ) val = val.substring(0, 2) + '/' + val.substring(2)
	if( val.length > 4 ) val = val.substring(0, 5) + '/' + val.substring(5, 9)
	
	if( event?.nativeEvent.inputType === 'deleteContentBackward' ){
		if( val.length === 3 || val.length === 6 ) val = val.substring(0, val.length -1)
	}

	val = val.slice(0, 10)

  return val.trim()
}


export const InputDate = ({
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
	const input = useRef(null)

	const handleChange = e => {
		const { name, value } = e.target

		input.current.value = mask(value, e)

		return formContext.handleInputChange({
			target: {
				name: name,
				value: mask(value)
			}
		})
	}


	return (<div className="space-y-2">
		{ label && (<label className="select-none leading-tight block">{label}</label>) }
		
		<input 
			type={type ?? 'text'} 
			name={name} 
			defaultValue={mask(formContext?.formState[name])}
			onChange={handleChange}
			placeholder={placeholder}
			readOnly={readonly}
			disabled={disabled}
			minLength={minlength} 
			maxLength={maxlength} 
			className={className ? `${className} max-w-[150px]`: 'max-w-[150px]'}
			ref={input}
			autoComplete="off"
			/>
	</div>)
}


InputDate.propTypes = {
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