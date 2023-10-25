import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/actividadFisicaPrescrita'

const id = 'R8S9T0'

export const ActividadFisicaPrescripta = ({context}) => {

	const formContext = useContext(context)
	const [ input_visible, setInputVisible ] = useState(false)

	const handleChange = e => {
		const {name, value} = e.target
		formContext.handleInputChange({target: {name, value}})
		setInputVisible('n' === value)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="¿Ha prescrito actividad física al paciente?" />

			<div className="space-y-3">
				{fields.map(({key, name, value, label}) => (
				<AlertMessage key={key} name={name} context={context}>

					<div key={key} className="flex gap-6 items-start">
						{ key !== 'pa__prescribed_2' 
						? (<label className="input-checkbox">
								<input 
									type="radio" 
									name={name} 
									onChange={handleChange}
									defaultValue={value}
									checked={formContext.formState[name] === value} />

								<span>{label}</span>

							</label>)
						: (<>
							<label className="input-checkbox w-52">
								<input 
									type="radio"
									name={name}
									onChange={handleChange}
									defaultValue={value}
									checked={formContext.formState[name] === value} />
								
								<span>{label}</span>
							
							</label>

							{ ('n' === formContext.formState[name] || input_visible) && (
								<div className="w-full relative -top-1 flex-1">
									<Input name="pa__prescribed_reasons" context={context} />
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


ActividadFisicaPrescripta.propTypes = {
	context: PropTypes.object.isRequired
}