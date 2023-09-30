import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/resultadoValoracionNutricional'

const id = 'resultadoDeLaValoracionNutricional'

export const ResultadoValoracionNutricional = ({context}) => {

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
		if( 'si' !== value ) formContext.handleInputChange({target: {name: 'patient_malnourished__code', value: ''}})
		setInputVisible('si' === value)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	
				title="Resultado de la valoración nutricional"
				subtitle="¿Está el paciente desnutrido?" />

			<div className="space-y-3">
				{fields.map(({key, name, value, label}) => (<div key={key} className="flex gap-6 items-start">
					{ key !== 'patient_malnourished_3' 
					? (<label className="input-checkbox">
							<input 
								type="radio" 
								name={name} 
								onChange={handleChange}
								defaultValue={value} />

							<span>{label}</span>

						</label>)
					: (<>
						<label className="input-checkbox">
							<input 
								type="radio"
								name={name}
								onChange={handleChange}
								defaultValue={value} />
							
							<span>{label}</span>
						
						</label>

						{ input_visible 
						&& (<div className="w-28 realtive -top-1">
									<Input name="patient_malnourished__code" context={context} />
								</div>)}
						
					</>)}
				</div>))}
			</div>
		</section>
	</>)

}


ResultadoValoracionNutricional.propTypes = {
	context: PropTypes.object.isRequired
}