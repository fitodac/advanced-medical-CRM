import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/objetivosPlanteados'


export const ObjetivosPlanteados = ({context}) => {
	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	
				title="Objetivo/s planteado/s"
				subtitle="(Puede indicarse más de uno si en su opinión aplica)" />

			<CheckboxList options={fields} />

			<ConditionalInput label="Otro (especifique)" context={context} />
		</section>
	</>)
}


ObjetivosPlanteados.propTypes = {
	context: PropTypes.object.isRequired
}