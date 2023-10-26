import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/diagnosticoNutricionalUtilizado'

const id = 'J8K9L0'

export const DiagnosticoNutricionalUtilizado = ({context}) => {

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	
				title="Diagnóstico nutricional utilizado" 
				required />
			
			<CheckboxList 
				options={fields} 
				context={context} />

			<ConditionalInput 
				name="nd__other_description"
				checkbox={{
					label: 'Otro (especifique)',
					name: 'nd__other',
					defaultValue: 'y',
				}}
				context={context} />
		</section>
	</>)

}


DiagnosticoNutricionalUtilizado.propTypes = {
	context: PropTypes.object.isRequired
}