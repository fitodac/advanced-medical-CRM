import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/objetivosPlanteados'

const id = 'Y3Z4A5'

export const ObjetivosPlanteados = ({context}) => {
	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	
				title="Objetivo/s planteado/s"
				subtitle="(Puede indicarse más de uno si en su opinión aplica)" />

			<CheckboxList options={fields} context={context} />

			<ConditionalInput 
				checkbox={{
					label: 'Otro (especifique)',
					name: 'nt__planted_objectives__other',
					defaultValue: 'y',
				}} 
				name="nt__planted_objectives__other_description"
				context={context} />
		</section>
	</>)
}


ObjetivosPlanteados.propTypes = {
	context: PropTypes.object.isRequired
}