import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/diagnosticoNutricionalUtilizado'

export const DiagnosticoNutricionalUtilizado = ({context}) => {

	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	title="Diagnóstico nutricional utilizado" />
			
			<CheckboxList options={fields} />

			<ConditionalInput label="Otro (especifique)" context={context} />
		</section>
	</>)

}


DiagnosticoNutricionalUtilizado.propTypes = {
	context: PropTypes.object.isRequired
}