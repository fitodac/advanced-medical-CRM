import PropTypes from 'prop-types'
import { InputDate } from '../../../components/Ui'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { 
	HeaderFieldGroup 
} from '.'

import fields from '../formfields/fechaValoracion'

const id = 'P4Q5R6'

export const FechaValoracion = ({context}) => {
	return (<>
	<section className="space-y-3" id={id}>
		<HeaderFieldGroup title="Fecha de valoración" required />
		
		<InputDate 
			label="Fecha (día/mes/año)" 
			name="valuation_date" 
			context={context} />
		
		<div className="space-y-2 pt-4">
			<ConditionalInput 
				name="hospitalization_reason" 
				checkbox={{
					...fields[0]
				}}
				context={context} />
			
			<CheckboxList 
				options={[{...fields[1]}]} 
				context={context} />
		</div>
	</section>
	</>)
}


FechaValoracion.propTypes = {
	context: PropTypes.object.isRequired
}