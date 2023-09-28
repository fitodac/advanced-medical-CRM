import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/iniciaTratamientoNutricional'


export const IniciaTratamientoNutricional = ({context}) => {
	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	title="Inicia tratamiento nutricional" />

			<CheckboxList options={fields} />

			<ConditionalInput label="Sí (especifique)" context={context} />
		</section>
	</>)
}


IniciaTratamientoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}