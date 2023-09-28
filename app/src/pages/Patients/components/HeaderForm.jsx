import PropTypes from 'prop-types'
import { InputDate } from '../../../components/Ui'


export const HeaderForm = ({ 
	title, 
	patient,
	context 
}) => {

	const { name, gender } = patient

	return (<>
		<div className="text-lg font-bold">{title}</div>

		<div className="leading-none mt-4">
			<label htmlFor="">Paciente</label>
			<div className="text-xl font-semibold">{name}</div>
		</div>

		<div className="grid grid-cols-2 gap-x-6 gap-y-4">
			<InputDate label="Fecha" name="date" context={context} />

			<div className="">
				<label>Sexo</label>
				<div className="capitalize">{gender}</div>
			</div>
		</div>
	</>)
}

HeaderForm.propTypes = {
	title: PropTypes.string,
	patient: PropTypes.object,
	context: PropTypes.object
}