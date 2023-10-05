import { useContext } from 'react'
import PropTypes from 'prop-types'
import { HeaderFieldGroup } from '.'
import { InputDate } from '../../../components/Ui'

import fields from '../formfields/situacionActualDelPaciente'

const id = 'C3D4E5'

export const SituacionActualDelPaciente = ({context}) => {

	const formContext = useContext(context)

	const handleChange = e => {
		const {name, value} = e.target
		formContext.handleInputChange({target: {name, value}})
		// setChkState(value)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Situación actual del paciente" />

			
			<div className="space-y-4">
				{ fields && fields.map(({key, name, value, label}) => (<div key={key} className="flex gap-6 items-bottom">
					
					<div className={`flex items-end ${'patient_current_situation_4' !== key ? 'w-40' : ''}`}>
						<label className="input-checkbox">
				
							<input 
								type="radio" 
								name={name} 
								defaultValue={value}
								onChange={handleChange} />
							
							<span dangerouslySetInnerHTML={label} />
				
						</label>
					</div>

					{'patient_current_situation_4' !== key && (
						<div className="flex-1">
							<InputDate 
								label="Fecha" 
								name="patient_current_situation_date" 
								context={context} />
						</div>
					)}


				</div>))}
			</div>
		</section>
	</>)
}


SituacionActualDelPaciente.propTypes = {
	context: PropTypes.object.isRequired
}