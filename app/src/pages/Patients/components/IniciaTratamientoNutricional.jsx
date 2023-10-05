import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/iniciaTratamientoNutricional'

const id = 'V0W1X2'

export const IniciaTratamientoNutricional = ({context}) => {

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
		if( 'y' !== value ) formContext.handleInputChange({target: {name: 'nt__specify', value: ''}})
		setInputVisible('y' === value)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Inicia tratamiento nutricional" />

			<div className="space-y-3">
				{fields.map(({key, name, value, label}) => (<div key={key} className="flex gap-6 items-start">
					{ key !== 'nt__start_2' 
					? (<label className="input-checkbox">
							<input 
								type="radio" 
								name={name} 
								onChange={handleChange}
								defaultValue={value} />

							<span>{label}</span>

						</label>)
					: (<>
						<label className="input-checkbox w-40">
							<input 
								type="radio"
								name={name}
								onChange={handleChange}
								defaultValue={value} />
							
							<span>{label}</span>
						
						</label>

						{ input_visible 
						&& (<div className="w-full relative -top-1">
									<Input name="nt__specify" context={context} />
								</div>)}
						
					</>)}
				</div>))}
			</div>
		</section>
	</>)
}


IniciaTratamientoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}