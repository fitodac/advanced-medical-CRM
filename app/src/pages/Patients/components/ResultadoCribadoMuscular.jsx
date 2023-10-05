import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/resultadoCribadoMuscular'

const id = 'Q1R2S3'

export const ResultadoCribadoMuscular = ({context}) => {

	const formContext = useContext(context)
	const [ chkState, setChkState ] = useState('')

	useEffect(() => {
		formContext.handleInputChange({target: {name: fields.options[0].name, value: chkState}})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chkState])

	const handleChange = e => {
		const {value, checked} = e.target
		setChkState(checked ? value : '')
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	
				title="Resultado del cribado muscular"
				subtitle="¿Está el paciente en riesgo de sarcopenia?" />

			<div className="flex gap-x-4">
				{ fields.options.map(({key, name, value, label}) => (<div key={key} className="flex gap-6 items-start">
					<label className="input-checkbox">
						
						<input 
							type="radio"
							name={name} 
							defaultValue={value}
							onChange={handleChange} />

						<span>{label}</span>

					</label>
				</div>))}
			</div>
		</section>
	</>)
}


ResultadoCribadoMuscular.propTypes = {
	context: PropTypes.object.isRequired
}