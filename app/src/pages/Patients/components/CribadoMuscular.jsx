import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { 
	HeaderFieldGroup
} from '.'

import fields from '../formfields/cribadoMuscular'

const id = 'A9B0C1'

export const CribadoMuscular = ({context}) => {
	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Cribado muscular" />

			<CheckboxList 
				options={fields} 
				context={context} />

			<ConditionalInput 
				name="ms__other_description"
				checkbox={{
					label: 'Otros (especifique)',
					name: 'ms__other',
					defaultValue: 'y',
				}} 
				context={context} />
		</section>
	</>)
}


CribadoMuscular.propTypes = {
	context: PropTypes.object.isRequired
}