import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/iniciaTratamientoNutricional'

const id = 'V0W1X2'

export const IniciaTratamientoNutricional = ({context}) => {

	const formContext = useContext(context)
	const [ input_visible, setInputVisible ] = useState(false)

	const handleChange = e => {
		const {name, value} = e.target
		formContext.handleInputChange({target: {name, value}})
		setInputVisible('y' === value)
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Inicia tratamiento nutricional" />

			<div className="space-y-3">
				{fields.map(({key, name, value, label}) => (
				<AlertMessage key={key} name={name} context={context}>

					<div className="flex gap-6 items-start">
						{ key !== 'nt__start_2' 
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
							<label className="input-checkbox w-40">
								<input 
									type="radio"
									name={name}
									onChange={handleChange}
									defaultValue={value}
									checked={formContext.formState[name] === value} />
								
								<span>{label}</span>
							
							</label>

							{ ('y' === formContext.formState[name] || input_visible) && (
								<div className="w-full relative -top-1">
									<Input name="nt__specify" context={context} />
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


IniciaTratamientoNutricional.propTypes = {
	context: PropTypes.object.isRequired
}