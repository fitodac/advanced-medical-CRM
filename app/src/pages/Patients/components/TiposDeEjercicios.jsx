import PropTypes from 'prop-types'
import { CheckboxList } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/tiposDeEjercicios'

export const TiposDeEjercicios = ({context}) => {

	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	
				title="¿Qué tipo de ejercicios ha recomendado?"
				subtitle="(Señale uno o varios si aplican)" />

			<CheckboxList options={fields} />
		</section>
	</>)

}


TiposDeEjercicios.propTypes = {
	context: PropTypes.object.isRequired
}