import { useContext } from 'react'
import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/tipoTratamientoNutricionalIndicado'

const id = 'I9J0K1'


export const TipoTratamientoNutricionalIndicado = ({context}) => {

	const formContext = useContext(context)

	const handleChange = e => {
		const {name, value, checked} = e.target
		const val = checked ? value : ''
		formContext.handleInputChange({target: {name, value: val}})
	}

	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	title="Tipo de tratamiento nutricional indicado" />

			{fields.map(({
				key, 
				name, 
				value, 
				label, 
				options, 
				other
			}) => (
			<AlertMessage key={key} name={name} context={context}>
				<label className="input-checkbox">
					<input 
						type="checkbox" 
						name={name} 
						onChange={handleChange}
						defaultValue={value} />
					<span dangerouslySetInnerHTML={label} />
				</label>

				{options && (<div className="pt-2 pb-3 pl-8">
					<CheckboxList options={options} context={context} />
				</div>)}

				{other && (<div className="pb-3 pl-8">
					<ConditionalInput 
						name={other.name}
						checkbox={other.checkbox} 
						context={context} />
				</div>)}
			</AlertMessage>
			))}
			
			
		</section>
	</>)

}


TipoTratamientoNutricionalIndicado.propTypes = {
	context: PropTypes.object.isRequired
}