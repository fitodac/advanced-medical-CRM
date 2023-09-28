import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/resultadoValoracionNutricional'

export const ResultadoValoracionNutricional = ({context}) => {

	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	
				title="Resultado de la valoración nutricional"
				subtitle="¿Está el paciente desnutrido?" />
			
			<CheckboxList options={fields} />

			<ConditionalInput 
				label="Sí, especifique, Codificación de desnutrición según CIE 10" 
				inputContainerClassName="w-20"
				context={context} />
		</section>
	</>)

}


ResultadoValoracionNutricional.propTypes = {
	context: PropTypes.object.isRequired
}