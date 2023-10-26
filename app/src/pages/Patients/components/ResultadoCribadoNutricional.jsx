import { useContext } from 'react'
import PropTypes from 'prop-types'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/resultadoCribadoNutricional'

const id = 'T4U5V6'

export const ResultadoCribadoNutricional = ({context}) => {

	const formContext = useContext(context)

	const handleChange = e => {
		const {name, value} = e.target
		formContext.handleInputChange({target: {name, value}})
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	
				title="Resultado del cribado nutricional"
				subtitle="¿Está el paciente en riesgo de desnutrición?"
				required />

			
			<div className="flex gap-x-4">
				{ fields && fields.map(({key, name, value, label}) => (
				<AlertMessage key={key} name={name} context={context}>
					<div className="flex gap-6 items-start">
						<label className="input-checkbox">
				
							<input 
								type="radio" 
								name={name} 
								defaultValue={value}
								onChange={handleChange}
								checked={formContext.formState[name] === value} />

							<span>{label}</span>
				
						</label>
					</div>
				</AlertMessage>
				))}
			</div>
		</section>
	</>)
}


ResultadoCribadoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}