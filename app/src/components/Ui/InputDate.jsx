import { useContext, useRef } from 'react'
import PropTypes from 'prop-types'

const mask = (val, event) => {
	if (!val) return ''

	val = String(val).replace(/\D/g, '')

	if (val.length === 2) {
		const day = Math.min(parseInt(val.substring(0, 2), 10), 31)
		val = day.toString().padStart(2, '0') + val.substring(2)
	}

	if (val.length === 4) {
		const month = Math.min(parseInt(val.substring(2, 4), 10), 12)
		val =
			val.substring(0, 2) + month.toString().padStart(2, '0') + val.substring(4)
	}

	if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2)
	if (val.length > 4) val = val.substring(0, 5) + '/' + val.substring(5, 9)

	if (event?.nativeEvent.inputType === 'deleteContentBackward') {
		if (val.length === 3 || val.length === 6)
			val = val.substring(0, val.length - 1)
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
	context,
	required = false,
}) => {
	const formContext = useContext(context)
	const input = useRef(null)

	const handleChange = (e) => {
		const { name, value } = e.target

		input.current.value = mask(value, e)

		return formContext.handleInputChange({
			target: {
				name: name,
				value: mask(value),
			},
		})
	}

	return (
		<div className="space-y-2">
			{label && (
				<label className="select-none leading-tight block">
					{label}
					{required && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							className="fill-red-600 w-3 pl-0.5 inline -top-1 relative"
						>
							<path d="M12.9993 3L12.9991 10.267L19.2935 6.63397L20.2935 8.36602L14.0001 11.999L20.2935 15.634L19.2935 17.366L12.9991 13.732L12.9993 21H10.9993L10.9991 13.732L4.70508 17.366L3.70508 15.634L9.99808 12L3.70508 8.36602L4.70508 6.63397L10.9991 10.267L10.9993 3H12.9993Z" />
						</svg>
					)}
				</label>
			)}

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
				className={className ? `${className} max-w-[150px]` : 'max-w-[150px]'}
				ref={input}
				autoComplete="off"
			/>
		</div>
	)
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
	context: PropTypes.object.isRequired,
	required: PropTypes.bool,
}
