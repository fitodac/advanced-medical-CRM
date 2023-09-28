import PropTypes from 'prop-types'
import { ConditionalInput } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/actividadFisicaPrescrita'

const id = 'haPrescritoActividadFisica'

export const ActividadFisicaPrescripta = ({context}) => {

	const {name, value, label} = fields[0]

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="¿Ha prescrito actividad física al paciente?" />

			<label className="input-checkbox">
				<input type="checkbox" name={name} defaultValue={value} />
				<span>{label}</span>
			</label>
			
			<ConditionalInput label="No (especifique motivo/s)" context={context} />
		</section>
	</>)

}


ActividadFisicaPrescripta.propTypes = {
	context: PropTypes.object.isRequired
}