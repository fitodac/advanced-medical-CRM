import PropTypes from 'prop-types'
import { ConditionalInput } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/refiereEndocrinologiaParaIniciarTratamientoNutricional'

const id = 'refiereAlServicioDeEndocrinologiaParaIniciarTratamiento'

export const RefiereEndocrinologiaParaIniciarTratamientoNutricional = ({context}) => {

	const {name, value, label} = fields[0]

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Refiere al Servicio de Endocrinología y Nutrición para iniciar tratamiento nutricional" />

			<label className="input-checkbox">
				<input type="checkbox" name={name} defaultValue={value} />
				<span>{label}</span>
			</label>
			
			<ConditionalInput label="Otro (especifique)" context={context} />
		</section>
	</>)

}


RefiereEndocrinologiaParaIniciarTratamientoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}