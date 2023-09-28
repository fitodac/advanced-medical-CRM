import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/antecedentesMedicos'

export const AntecedentesMedicos = ({context}) => {

	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	
				title="Antecedentes médicos"
				subtitle="(Especificar patología y estadío si procede)" />
			
			<CheckboxList options={fields} />

			<ConditionalInput label="Otros (especifique)" context={context} />
		</section>
	</>)

}


AntecedentesMedicos.propTypes = {
	context: PropTypes.object.isRequired
}