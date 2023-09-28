import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Datepicker } from 'vanillajs-datepicker'



export const InputDate = ({
	name,
	label,
	className,
	value
}) => {

	const [ modal, setModal ] = useState(false)
	const datepickerModal = useRef(null)
	const [ date, setDate ] = useState( value ?? '')



	useEffect(() => {
		const datepicker = new Datepicker(datepickerModal.current, {})

		datepickerModal.current.addEventListener('changeDate', () => {
			setDate(datepicker.getDate('dd/mm/y'))
			datepickerModal.current.blur()
			setModal(false)
		})
	}, [])


	return (<div className="">
		{ label && (<label className="select-none">{label}</label>) }

		<div className="">
			<input
				type="text"
				name={name}
				id={`${name}datepickerModal`}
				className={className ? `${className} max-w-[150px]`: 'max-w-[150px]'}
				onFocus={() => setModal(true)}
				onChange={() => setModal(false)}
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
}