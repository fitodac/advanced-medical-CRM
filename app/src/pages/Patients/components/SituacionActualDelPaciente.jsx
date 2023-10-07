import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'
import { InputDate } from '../../../components/Ui'

import fields from '../formfields/situacionActualDelPaciente'

const id = 'C3D4E5'

export const SituacionActualDelPaciente = ({context}) => {

	const formContext = useContext(context)
	const [ input_visible, setInputVisible ] = useState(false)

	const handleChange = e => {
		const {name, value} = e.target
		formContext.handleInputChange({target: {name, value}})
		const values = ['Alta', 'Reingreso', 'Deceso']
		setInputVisible(values.includes(value))

	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Situación actual del paciente" />

			<div className="flex">

				<div className="grid gap-y-4">
					{ fields && fields.map(({key, name, value, label}) => (
					<AlertMessage key={key} name={name} context={context}>
						<label className="input-checkbox">
				
							<input 
								type="radio" 
								name={name} 
								defaultValue={value}
								onChange={handleChange}
								checked={formContext.formState[name] === value} />
							
							<span>{label}</span>
						</label>
					</AlertMessage>
					))}
				</div>

				{input_visible && (
					<div className="flex-1">
					<InputDate 
					label="Fecha" 
					name="patient_current_situation_date" 
					context={context} />
					</div>
				)}

			</div>
		</section>

		
	</>)
}


SituacionActualDelPaciente.propTypes = {
	context: PropTypes.object.isRequired
}