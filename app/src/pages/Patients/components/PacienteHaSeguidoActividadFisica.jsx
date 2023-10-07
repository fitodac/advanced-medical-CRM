import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/pacienteHaSeguidoActividadFisica'

const id = 'E9F0G1'

export const PacienteHaSeguidoActividadFisica = ({context}) => {

	const formContext = useContext(context)
	const [ input_visible, setInputVisible ] = useState('')
	const [ chkState, setChkState ] = useState('')

	useEffect(() => {
		formContext.handleInputChange({target: {name: fields[0].name, value: chkState}})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chkState])

	const handleChange = e => {
		const {value, checked} = e.target
		setChkState(checked ? value : '')
		if( 'y' !== value ) formContext.handleInputChange({target: {name: 'nt__followed_prescribed_nutritional_recommendation', value: ''}})
		setInputVisible(e.target.id)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="¿El paciente ha seguido la recomendación de actividad física prescrita?" />

			<div className="space-y-3">
				{fields.map(({key, name, value, label}) => (
					<AlertMessage key={key} name={name} context={context}>

						<div className="flex gap-6 items-start">
							<label className="input-checkbox">
								<input 
									type="radio" 
									name={name} 
									id={key}
									onChange={handleChange}
									defaultValue={value}
									checked={formContext.formState[name] === value} />

								<span className="w-52">{label}</span>

							</label>

							{(
								'hfppar_followed_prescribed_physical_activity_recommendation_1' === key && 
								'hfppar_followed_prescribed_physical_activity_recommendation_1' === input_visible
							) && (
								<div className="w-90 relative -top-1">
									<Input 
										label="Especifique % de adherencia a las recomendaciones"
										name="hfppar_percentage_of_adherece_to_recommendations" 
										context={context} />
								</div>
							)}

							{(
								'hfppar_followed_prescribed_physical_activity_recommendation_2' === key &&
								'hfppar_followed_prescribed_physical_activity_recommendation_2' === input_visible
							) && (
								<div className="w-full relative -top-1">
									<Input name="hfppar__not_followed_prescribed_recommendation" context={context} />
								</div>
							)}

						</div>
					</AlertMessage>
				))}
			</div>
		</section>
	</>)
}


PacienteHaSeguidoActividadFisica.propTypes = {
	context: PropTypes.object.isRequired
}