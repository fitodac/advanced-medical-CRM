import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/resultadoValoracionMuscular'

const id = 'W7X8Y9'

export const ResultadoValoracionMuscular = ({context}) => {

	const formContext = useContext(context)

	const handleChange = e => {
		const {name, value} = e.target
		formContext.handleInputChange({target: {name, value}})
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	
				title="Resultado de la valoración muscular"
				subtitle="¿La masa muscular/función del paciente es normal?" />
				

			<div className="flex gap-x-4">
				{ fields.map(({key, name, value, label}) => (<div key={key} className="flex gap-6 items-start">
					<label className="input-checkbox">
						
						<input 
							type="radio"
							name={name} 
							onChange={handleChange}
							defaultValue={value}
							checked={value === formContext.formState[name]} />

						<span>{label}</span>

					</label>
				</div>))}
			</div>
			
		</section>
	</>)

}


ResultadoValoracionMuscular.propTypes = {
	context: PropTypes.object.isRequired
}