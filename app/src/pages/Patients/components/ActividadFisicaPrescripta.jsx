import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/actividadFisicaPrescrita'

const id = 'R8S9T0'

export const ActividadFisicaPrescripta = ({context}) => {

	const formContext = useContext(context)
	const [ input_visible, setInputVisible ] = useState(false)
	const [ chkState, setChkState ] = useState('')

	useEffect(() => {
		formContext.handleInputChange({target: {name: fields[0].name, value: chkState}})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chkState])

	const handleChange = e => {
		const {value, checked} = e.target
		setChkState(checked ? value : null)
		if( 'y' === value ) formContext.handleInputChange({target: {name: 'pa__prescribed_reasons', value: ''}})
		setInputVisible('y' !== value)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Inicia tratamiento nutricional" />

			<div className="space-y-3">
				{fields.map(({key, name, value, label}) => (<div key={key} className="flex gap-6 items-start">
					{ key !== 'pa__prescribed_2' 
					? (<label className="input-checkbox">
							<input 
								type="radio" 
								name={name} 
								onChange={handleChange}
								defaultValue={value} />

							<span>{label}</span>

						</label>)
					: (<>
						<label className="input-checkbox w-52">
							<input 
								type="radio"
								name={name}
								onChange={handleChange}
								defaultValue={value} />
							
							<span>{label}</span>
						
						</label>

						{ input_visible 
						&& (<div className="w-full relative -top-1 flex-1">
									<Input name="pa__prescribed_reasons" context={context} />
								</div>)}
						
					</>)}
				</div>))}
			</div>
		</section>
	</>)

}


ActividadFisicaPrescripta.propTypes = {
	context: PropTypes.object.isRequired
}