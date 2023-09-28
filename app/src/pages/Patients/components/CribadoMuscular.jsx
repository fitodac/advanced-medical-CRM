import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/cribadoMuscular'


export const CribadoMuscular = ({context}) => {
	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	title="Cribado muscular" />

			<CheckboxList options={fields} />

			<ConditionalInput label="Otros (especifique)" context={context} />
		</section>
	</>)
}


CribadoMuscular.propTypes = {
	context: PropTypes.object.isRequired
}