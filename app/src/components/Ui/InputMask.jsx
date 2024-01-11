import { useContext, useRef } from 'react'
import PropTypes from 'prop-types'

const mask = (val) => {
	if (!val) return ''
	val = String(val).replace(/[^0-9,.]/g, '')
	val = val.replaceAll('.', ',')

	if (val.match(/,/g) && val.match(/,/g).length > 1) {
		val = val.replace(/,([^,]*)$/, '$1')
	}

	if (val.includes(',')) {
		const sep = val.split(',')
		val = `${sep[0]},${sep[1][0] ?? ''}${sep[1][1] ?? ''}`
	}

	return val.trim()
}

export const InputMask = ({
	type = 'text',
	name,
	placeholder,
	readonly,
	disabled,
	label,
	maxlength,
	minlength,
	className = '',
	context,
}) => {
	const formContext = useContext(context)
	const input = useRef(null)

	const updateContext = (name, value) => {
		formContext.handleInputChange({
			target: {
				name: name,
				value: mask(value),
			},
		})
	}

	const handleChange = (e) => {
		let { name, value } = e.target

		let v = value
		if (Number(v.replace(',', '.')) > maxlength) value = maxlength
		if (Number(v.replace(',', '.')) < minlength) value = minlength

		input.current.value = mask(value)
		updateContext(name, mask(value))
	}

	const handleBlur = (e) => {
		const { value } = e.target
		if (value[value.length - 1] === ',') {
			const sanitValue = value.slice(0, -1)

			input.current.value = sanitValue
			updateContext(name, sanitValue)
		}
	}

	return (
		<div>
			{label && (
				<label className="select-none leading-tight block">{label}</label>
			)}
			<input
				type={type}
				name={name}
				defaultValue={mask(formContext?.formState[name])}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={placeholder}
				readOnly={readonly}
				disabled={disabled}
				minLength={minlength}
				maxLength={maxlength}
				className={`${className}`}
				style={readonly ? { backgroundColor: '#ebfcfdc9' } : {}}
				ref={input}
			/>
		</div>
	)
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
	context: PropTypes.object.isRequired,
}
