import { useContext } from 'react'
import PropTypes from 'prop-types'
import { InputDate } from '../../../components/Ui'


export const HeaderForm = ({ 
	title, 
	context 
}) => {

	const formContext = useContext(context)
	const { name } = formContext.patient

	return (<>
		<div className="text-lg font-bold">{title}</div>

		<div className="leading-none mt-4">
			<label htmlFor="">Paciente</label>
			<div className="text-xl font-semibold">{name}</div>
		</div>

		<div className="grid grid-cols-2 gap-x-6 gap-y-4">
			<InputDate 
				label="Fecha" 
				name="date" 
				context={context} />
		</div>
	</>)
}

HeaderForm.propTypes = {
	title: PropTypes.string,
	context: PropTypes.object
}