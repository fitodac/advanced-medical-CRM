import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { 
	Input,
	InputMask
} from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/pacienteHaSeguidoTratamientoNutricional'

const id = 'H2I3J4'

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
		setInputVisible(e.target.id)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="¿El paciente ha seguido la recomendación nutricional prescrita?" />

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
								'hfnr__followed_prescribed_nutritional_recommendation_1' === key && 
								'hfnr__followed_prescribed_nutritional_recommendation_1' === input_visible
							) && (
								<div className="w-90 relative -top-1">
									<InputMask 
										label="Especifique % de adherencia a las recomendaciones"
										name="hfnr__percentage_of_adherece_to_recommendations" 
										context={context} />
								</div>
							)}

							{(
								'hfnr__followed_prescribed_nutritional_recommendation_2' === key &&
								'hfnr__followed_prescribed_nutritional_recommendation_2' === input_visible
							) && (
								<div className="w-full relative -top-1">
									<Input name="hfnr__not_followed_prescribed_recommendation" context={context} />
								</div>
							)}

						</div>
					</AlertMessage>
				))}
			</div>
		</section>
	</>)
}


PacienteHaSeguidoTratamientoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}