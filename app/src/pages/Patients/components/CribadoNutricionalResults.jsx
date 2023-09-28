import PropTypes from 'prop-types'
import { 
	CheckboxList
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/cribadoNutricionalResults'


export const CribadoNutricionalResults = ({context}) => {
	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	
				title="Resultado del cribado nutricional"
				subtitle="¿Está el paciente en riesgo de desnutrición?" />

			<div className="flex gap-x-4">
				{ fields && fields.map((e) => (<div key={e?.value} className="flex gap-6 items-start">
					<label className="input-checkbox">
						<input type="checkbox" />
						<span>{e.label}</span>
					</label>
				</div>))}
			</div>
		</section>
	</>)
}


CribadoNutricionalResults.propTypes = {
	context: PropTypes.object.isRequired
}