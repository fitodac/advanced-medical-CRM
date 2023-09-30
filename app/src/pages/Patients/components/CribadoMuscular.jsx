import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/cribadoMuscular'

const id = 'cribadoMuscular'

export const CribadoMuscular = ({context}) => {
	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Cribado muscular" />

			<CheckboxList 
				options={fields} 
				context={context} />

			<ConditionalInput 
				name="ms__other"
				checkbox={{label: 'Otros (especifique)'}} 
				context={context} />
		</section>
	</>)
}


CribadoMuscular.propTypes = {
	context: PropTypes.object.isRequired
}