import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/cribadoNutricional'


const id = 'cribadoNutricional'

export const CribadoNutricional = ({context}) => {
	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Cribado nutricional" />

			<CheckboxList options={fields} />

			<ConditionalInput label="Otros (especifique)" context={context} />
		</section>
	</>)
}


CribadoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}