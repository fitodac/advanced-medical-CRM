/**
 * CheckboxGroup 
 * Muestra una lista de checkboxes.
 */
import { useContext } from 'react'
import PropTypes from 'prop-types'

export const CheckboxList = ({
	options,
	context
}) => {

	const formContext = useContext(context)

	const handleChange = e => {
		const {name, value, checked} = e.target
		const val = checked ? value : null
		formContext.handleInputChange({target: {name, value: val}})
	}


	return (<div className="space-y-3">
		{ options && options.map(({key, name, label, value}) => (<div key={key} className="flex gap-6 items-start">
				<label className="input-checkbox">
					
					<input 
						type="checkbox" 
						name={name} 
						onChange={handleChange} 
						defaultValue={value}
						checked={value === formContext.formState[name]} />
					
					<span>{label}</span>
				
				</label>
			</div>))}
	</div>)

}


CheckboxList.propTypes = {
	options: PropTypes.array,
	context: PropTypes.object.isRequired
}