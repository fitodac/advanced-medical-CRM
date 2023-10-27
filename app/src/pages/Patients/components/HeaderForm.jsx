import { useContext } from 'react'
import PropTypes from 'prop-types'
import { InputDate } from '../../../components/Ui'


export const HeaderForm = ({
	title,
	context,
	dateFieldLabel
}) => {

	const formContext = useContext(context)
	const { code } = formContext.patient


	return (<>
		<div className="text-lg font-bold">{title}</div>

		<div className="leading-none mt-4">
			<label htmlFor="">Paciente</label>
			<div className="text-xl font-semibold">{code}</div>
		</div>

		<div className="grid grid-cols-2 gap-x-6 gap-y-4">
			<div
				className={(formContext.formSaved && (formContext.formState.date === '' || !formContext.formState.date)) ?
										'bg-pink-50 bg-opacity-30 border-l-8 border-pink-400 px-3 py-2 transition-all rounded-r-lg'
										: ''}>
				<InputDate
					label={dateFieldLabel}
					name="date"
					context={context} />

				{(formContext.formSaved && (formContext.formState.date === '' || !formContext.formState.date)) ? (
					<div className="text-pink-500 text-sm leading-tight mt-1">Complete la fecha de la visita</div>
				) : null}
			</div>
		</div>
	</>)
}

HeaderForm.propTypes = {
	title: PropTypes.string,
	dateFieldLabel: PropTypes.string,
	context: PropTypes.object
}