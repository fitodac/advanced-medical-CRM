import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/pacienteHaSeguidoTratamientoNutricional'

const id = 'iniciaTratamientoNutricional'

export const PacienteHaSeguidoTratamientoNutricional = ({context}) => {

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
		console.log(e.target.id)
		setInputVisible(e.target.id)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="¿El paciente ha seguido la recomendación nutricional prescrita?" />

			<div className="space-y-3">
				{fields.map(({key, name, value, label}) => (
					<div key={key} className="flex gap-6 items-start">
						<label className="input-checkbox">
							<input 
								type="radio" 
								name={name} 
								id={key}
								onChange={handleChange}
								defaultValue={value} />

							<span>{label}</span>

						</label>

						{(
							'nt__followed_prescribed_nutritional_recommendation_1' === key && 
							'nt__followed_prescribed_nutritional_recommendation_1' === input_visible
						) && (
							<div className="w-90 relative -top-1">
								<Input 
									label="Especifique % de adherencia a las recomendaciones"
									name="nt__percentage_of_adherece_to_recommendations" 
									context={context} />
							</div>
						)}

						{(
							'nt__followed_prescribed_nutritional_recommendation_2' === key &&
							'nt__followed_prescribed_nutritional_recommendation_2' === input_visible
						) && (
							<div className="w-full relative -top-1">
								<Input name="nt__not_followed_prescribed_recommendation" context={context} />
							</div>
						)}

					</div>
				))}
			</div>
		</section>
	</>)
}


PacienteHaSeguidoTratamientoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}