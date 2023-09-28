import PropTypes from 'prop-types'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/resultadoCribadoNutricional'

const id = 'resultadoCribadoNutricional'

export const ResultadoCribadoNutricional = ({context}) => {
	return (<>
		<section className="space-y-3" id={id}>
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


ResultadoCribadoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}