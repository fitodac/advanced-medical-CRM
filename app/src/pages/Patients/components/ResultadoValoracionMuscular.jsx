import PropTypes from 'prop-types'
import { CheckboxList } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/resultadoValoracionMuscular'

export const ResultadoValoracionMuscular = ({context}) => {

	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	
				title="Resultado de la valoración muscular"
				subtitle="¿La masa muscular/función del paciente es normal?" />
			
			<CheckboxList options={fields} />
		</section>
	</>)

}


ResultadoValoracionMuscular.propTypes = {
	context: PropTypes.object.isRequired
}