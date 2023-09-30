/**
 * CheckboxGroup 
 * Muestra una lista de checkboxes con el agregado adicional 
 * de una sección de texto descriptivo.
 */
import { useContext } from 'react'
import PropTypes from 'prop-types'


export const RadioGroup = ({
	options,
	context
}) => {

	const formContext = useContext(context)

	const handleChange = e => {
		// console.log('handleChange', e.target.name)
		formContext.handleInputChange(e)
	}

	return (<div className="space-y-6">
		{ options && options.map(({key, text, options}) => (<div key={key} className="flex gap-5 items-start">
				{ options && options.map(({key, name, value, label}) => (
					<label key={key} className="input-checkbox">
						
						<input 
							type="radio" 
							name={name} 
							onChange={handleChange}
							defaultValue={value} />
						
						<span>{label}</span>
					
					</label>))}
			
			<div className="text-slate-500 leading-tight pl-4 select-none">{text}</div>
		</div>)) }
	</div>)

}


RadioGroup.propTypes = {
	options: PropTypes.array.isRequired,
	context: PropTypes.object.isRequired
}