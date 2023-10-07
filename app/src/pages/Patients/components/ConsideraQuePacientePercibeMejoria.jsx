import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/consideraQuePacientePercibeMejoria'

const id = 'X6Y7Z8'

export const ConsideraQuePacientePercibeMejoria = ({context}) => {

	const formContext = useContext(context)
	const [ input_visible, setInputVisible ] = useState(false)
	const [ chkState, setChkState ] = useState('')

	useEffect(() => {
		formContext.handleInputChange({target: {name: fields[0].name, value: chkState}})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chkState])

	const handleChange = e => {
		const {value, checked} = e.target
		setChkState(checked ? value : '')
		if( 'y' === value ) formContext.handleInputChange({target: {name: 'cppi__considers_that_patient_perceives_improvement_reasons', value: ''}})
		setInputVisible('' === value)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional indicado?" />

			<div className="space-y-3">
				{fields.map(({key, name, value, label}) => (
					<AlertMessage key={key} name={name} context={context}>

						<div className="flex gap-6 items-start">
							{ key === 'cppi__considers_that_patient_perceives_improvement_1' 
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
											<Input name="cppi__considers_that_patient_perceives_improvement_reasons" context={context} />
										</div>)}
								
							</>)}
						</div>
					</AlertMessage>
				))}
			</div>
		</section>
	</>)
}


ConsideraQuePacientePercibeMejoria.propTypes = {
	context: PropTypes.object.isRequired
}