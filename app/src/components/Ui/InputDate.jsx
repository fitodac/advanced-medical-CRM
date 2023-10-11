import { useContext, useRef } from 'react'
import PropTypes from 'prop-types'


const mask = (val) => {
  if (!val) return ''
  val = String(val).replace(/\D/g, '')

  if( val.length >= 2 ){
    const day = Math.min(parseInt(val.substring(0, 2), 10), 31)
    val = day.toString().padStart(2, '0') + val.substring(2)
  }

  if( val.length >= 4 ){
    const month = Math.min(parseInt(val.substring(2, 4), 10), 12)
    val = val.substring(0, 2) + month.toString().padStart(2, '0') + val.substring(4)
  }

  if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2)
  if (val.length >= 4) val = val.substring(0, 5) + '/' + val.substring(5, 9)
  
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


// import { 
// 	useState, 
// 	useEffect, 
// 	useRef, 
// 	useContext 
// } from 'react'
// import PropTypes from 'prop-types'
// import { Datepicker } from 'vanillajs-datepicker'

// export const InputDate = ({
// 	name,
// 	label,
// 	className,
// 	value,
// 	context
// }) => {

// 	const [ modal, setModal ] = useState(false)
// 	const datepickerModal = useRef(null)
// 	const [ date, setDate ] = useState('')
// 	const formContext = useContext(context)


// 	useEffect(() => {
// 		const el = datepickerModal.current
// 		const datepicker = new Datepicker(el, {})

// 		const handleChangeDate = () => {
// 			// formContext.handleInputChange({target: {name, value: datepicker.getDate('dd/mm/y')}})
// 			setDate(datepicker.getDate('dd/mm/y'))
// 			el.blur()
// 			setModal(false)
// 		}

// 		el.addEventListener('changeDate', handleChangeDate)
		
// 		return () => el.removeEventListener('changeDate', handleChangeDate)
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [])


// 	useEffect(() => {
// 		formContext.handleInputChange({target: {name, value: date}})
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [date])

// 	return (<div className="">
// 		{ label && (<label className="select-none">{label}</label>) }

// 		<div className="">
// 			<input
// 				type="text"
// 				name={name}
// 				id={`${name}datepickerModal`}
// 				className={className ? `${className} max-w-[150px]`: 'max-w-[150px]'}
// 				defaultValue={formContext?.formState[name]}
// 				onClick={() => setModal(true)}
// 				onChange={() => {}}
// 				readOnly />


// 			<input 
// 				type="checkbox" 
// 				id={`${name}ModalBox`} 
// 				value={date}
// 				className="hidden" 
// 				onChange={() => {}} 
// 				checked={modal} />


// 			<div className="overlay">
// 				<div className="modal">
// 					<div id={`${name}datepickerModal`} ref={datepickerModal} />					

// 					<div className="px-3 pb-3">
// 						<button 
// 							className="btn w-full"
// 							onClick={() => setModal(false)}>
// 							Cancel
// 						</button>
// 					</div>

// 				</div>
// 			</div>
// 		</div>

// 	</div>)
// }



// InputDate.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	label: PropTypes.string,
// 	className: PropTypes.string,
// 	context: PropTypes.object.isRequired
// }