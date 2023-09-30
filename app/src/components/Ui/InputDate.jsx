import { 
	useState, 
	useEffect, 
	useRef, 
	useContext 
} from 'react'
import PropTypes from 'prop-types'
import { Datepicker } from 'vanillajs-datepicker'



export const InputDate = ({
	name,
	label,
	className,
	value,
	context
}) => {

	const [ modal, setModal ] = useState(false)
	const datepickerModal = useRef(null)
	const [ date, setDate ] = useState( value ?? '')
	const formContext = useContext(context)


	useEffect(() => {
		const el = datepickerModal.current
		const datepicker = new Datepicker(el, {})

		const handleChangeDate = () => {
			// formContext.handleInputChange({target: {name, value: datepicker.getDate('dd/mm/y')}})
			setDate(datepicker.getDate('dd/mm/y'))
			el.blur()
			setModal(false)
		}

		el.addEventListener('changeDate', handleChangeDate)
		
		return () => el.removeEventListener('changeDate', handleChangeDate)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	useEffect(() => {
		formContext.handleInputChange({target: {name, value: date}})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date])

	return (<div className="">
		{ label && (<label className="select-none">{label}</label>) }

		<div className="">
			<input
				type="text"
				name={name}
				id={`${name}datepickerModal`}
				className={className ? `${className} max-w-[150px]`: 'max-w-[150px]'}
				onClick={() => setModal(true)}
				onChange={() => {}}
				value={date}
				readOnly
			/>


			<input 
				type="checkbox" 
				id={`${name}ModalBox`} 
				value={date}
				className="hidden" 
				onChange={() => {}} 
				checked={modal} 
				/>


			<div className="overlay">
				<div className="modal">
					<div id={`${name}datepickerModal`} ref={datepickerModal} />					

					<div className="px-3 pb-3">
						<button 
							className="btn w-full"
							onClick={() => setModal(false)}>
							Cancel
						</button>
					</div>

				</div>
			</div>
		</div>

	</div>)
}



InputDate.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.string,
	context: PropTypes.object.isRequired
}