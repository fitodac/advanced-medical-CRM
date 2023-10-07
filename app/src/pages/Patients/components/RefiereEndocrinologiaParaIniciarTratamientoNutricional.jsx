import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/refiereEndocrinologiaParaIniciarTratamientoNutricional'

const id = 'N8O9P0'

export const RefiereEndocrinologiaParaIniciarTratamientoNutricional = ({context}) => {

	const formContext = useContext(context)
	const [ chkState, setChkState ] = useState('')

	useEffect(() => {
		formContext.handleInputChange({target: {name: fields[0].name, value: chkState}})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chkState])

	const handleChange = e => {
		const {value, checked} = e.target
		setChkState(checked ? value : '')
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Refiere al Servicio de Endocrinología y Nutrición para iniciar tratamiento nutricional" />

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


RefiereEndocrinologiaParaIniciarTratamientoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}