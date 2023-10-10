import { useContext, useRef } from 'react'
import PropTypes from 'prop-types'


const mask = val => {
	if( !val ) return ''
	val = String(val).replace(/[^0-9,.]/g, '')
	val = val.replaceAll('.',',')

	if( val.match(/,/g) && val.match(/,/g).length > 1 ){
		val = val.replace(/,([^,]*)$/, '$1')
	}
	
	if( val.includes(',') ){
		const sep = val.split(',')
		val = `${sep[0]},${sep[1][0] ?? ''}${sep[1][1] ?? ''}`
	}

	return val.trim()
}


export const InputMask = ({
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

		input.current.value = mask(value)

		return formContext.handleInputChange({
			target: {
				name: name,
				value: mask(value)
			}
		})
	}

	return (<div className="">
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
			className={className}
			ref={input}
			/>
	</div>)
}


InputMask.propTypes = {
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