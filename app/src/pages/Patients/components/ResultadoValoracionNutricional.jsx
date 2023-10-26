import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/resultadoValoracionNutricional'

const id = 'Z0A1B2'

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
				subtitle="¿Está el paciente desnutrido?"
				required />

			<div className="space-y-3">
				{fields.map(({key, name, value, label}) => (
				<AlertMessage key={key} name={name} context={context}>

					<div key={key} className="flex gap-6 items-start">
						{ key !== 'patient_malnourished_3' 
						? (<label className="input-checkbox w-40">
								<input 
									type="radio" 
									name={name} 
									onChange={handleChange}
									defaultValue={value}
									checked={formContext.formState[name] === value} />

								<span>{label}</span>
							</label>)
						: (<>
							<label className="input-checkbox w-40">
								<input 
									type="radio"
									name={name}
									onChange={handleChange}
									defaultValue={value}
									checked={formContext.formState[name] === value} />
								
								<span>{label}</span>
							</label>

							{ ('si' === formContext.formState[name] || input_visible) && (
								<div className="w-full flex gap-x-4">
									<label className="text-sm font-light">Codificación desnutrición según CIE 10</label>
									<div className="w-28 relative -top-2">
										<Input name="patient_malnourished__code" context={context} />
									</div>
								</div>
							)}
							
						</>)}
					</div>
				</AlertMessage>
				))}
			</div>
		</section>
	</>)

}


ResultadoValoracionNutricional.propTypes = {
	context: PropTypes.object.isRequired
}