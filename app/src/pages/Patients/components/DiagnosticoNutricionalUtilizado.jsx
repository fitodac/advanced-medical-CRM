import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/diagnosticoNutricionalUtilizado'

const id = 'diagnosticoNutricionalUtilizado'

export const DiagnosticoNutricionalUtilizado = ({context}) => {

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Diagnóstico nutricional utilizado" />
			
			<CheckboxList 
				options={fields} 
				context={context} />

			<ConditionalInput 
				checkbox={{
					label: 'Otro (especifique)'
				}} 
				name="nd__other"
				context={context} />
		</section>
	</>)

}


DiagnosticoNutricionalUtilizado.propTypes = {
	context: PropTypes.object.isRequired
}