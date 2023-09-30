import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/objetivosPlanteados'

const id = 'objetivosPlanteados'

export const ObjetivosPlanteados = ({context}) => {
	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	
				title="Objetivo/s planteado/s"
				subtitle="(Puede indicarse más de uno si en su opinión aplica)" />

			<CheckboxList options={fields} context={context} />

			<ConditionalInput 
				checkbox={{
					label: 'Otro (especifique)'
				}} 
				name="nt__planted_objectives__other"
				context={context} />
		</section>
	</>)
}


ObjetivosPlanteados.propTypes = {
	context: PropTypes.object.isRequired
}