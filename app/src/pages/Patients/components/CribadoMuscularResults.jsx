import PropTypes from 'prop-types'
// import { Input } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/cribadoMuscularResults'


export const CribadoMuscularResults = ({context}) => {
	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	
				title="Resultado del cribado muscular"
				subtitle="¿Está el paciente en riesgo de sarcopenia?" />

			<div className="flex gap-x-4">
				{/* <div className="">
					<label>Puntuación</label>
					<Input name={fields} context={context} />
				</div> */}

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


CribadoMuscularResults.propTypes = {
	context: PropTypes.object.isRequired
}