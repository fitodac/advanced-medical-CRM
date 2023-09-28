import PropTypes from 'prop-types'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/resultadoCribadoMuscular'

const id = 'resultadoCribadoMuscular'

export const ResultadoCribadoMuscular = ({context}) => {
	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	
				title="Resultado del cribado muscular"
				subtitle="¿Está el paciente en riesgo de sarcopenia?" />

			<div className="flex gap-x-4">
				{ fields && fields.options.map((e) => (<div key={e?.value} className="flex gap-6 items-start">
					<label className="input-checkbox">
						<input type="checkbox" />
						<span>{e.label}</span>
					</label>
				</div>))}
			</div>
		</section>
	</>)
}


ResultadoCribadoMuscular.propTypes = {
	context: PropTypes.object.isRequired
}