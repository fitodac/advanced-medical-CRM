import PropTypes from 'prop-types'
import { InputDate } from '../../../components/Ui'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/fechaValoracion'

export const FechaValoracion = ({context}) => {
	return (<>
	<section className="space-y-3">
		<HeaderFieldGroup title="Fecha de valoración" />
		
		<InputDate label="Fecha" name="valuation_date" context={context} />
		
		<div className="space-y-2 pt-4">
			<ConditionalInput label={fields[0].label} context={context} />
			<CheckboxList options={[{...fields[1]}]} />
		</div>
	</section>
	</>)
}


FechaValoracion.propTypes = {
	context: PropTypes.object.isRequired
}