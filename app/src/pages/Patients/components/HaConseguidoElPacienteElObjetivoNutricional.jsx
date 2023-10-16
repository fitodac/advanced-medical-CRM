import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/haConseguidoElPacienteElObjetivoNutricional'

const id = 'S7T8U9'

export const HaConseguidoElPacienteElObjetivoNutricional = ({context}) => {

	const formContext = useContext(context)
	const [ input_visible, setInputVisible ] = useState(false)

	const handleChange = e => {
		const {name, value} = e.target
		formContext.handleInputChange({target: {name, value}})
		setInputVisible('n' === value)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?" />

			<div className="space-y-3">
				{fields.map(({key, name, value, label}) => (
					<AlertMessage key={key} name={name} context={context}>
						<div className="flex gap-6 items-start">
							{ key === 'rng__has_reached_nutritional_goal_1' 
							? (<label className="input-checkbox">
									<input 
										type="radio" 
										name={name} 
										onChange={handleChange}
										defaultValue={value}
										checked={formContext.formState[name] === value} />

									<span>{label}</span>

								</label>)
							: (<>
								<label className="input-checkbox">
									<input 
										type="radio"
										name={name}
										onChange={handleChange}
										defaultValue={value}
										checked={formContext.formState[name] === value} />
									
									<span className="w-52">{label}</span>
								
								</label>

								{ input_visible 
								&& (<div className="w-full relative -top-1">
											<Input name="rng__has_reached_nutritional_goal_reasons" context={context} />
										</div>)}
								
							</>)}
						</div>
					</AlertMessage>
				))}
			</div>
		</section>
	</>)
}


HaConseguidoElPacienteElObjetivoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}