import { useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '.'


export const ConditionalInput = ({
	name,
	context,
	inputContainerClassName,
	checkbox
}) => {

	const formContext = useContext(context)
	const { 
		name: chkName,
		defaultValue,
		label 
	} = checkbox

	const handleChange = e => {
		const {checked, value } = e.target
		const val = checked ? value : null
		formContext.handleInputChange({target: {name: chkName, value: val}})
	}

	return (<div className="flex gap-x-6 items-start">
						<label className="input-checkbox">
							<input 
								type="checkbox" 
								name={chkName} 
								onChange={handleChange}
								value={defaultValue}
								checked={defaultValue === formContext.formState[chkName]} 
								/>
							<span>{label}</span>
						</label>

						<div className="flex-1 relative -top-1">
							{ formContext.formState[chkName] 
							&& (<div className={inputContainerClassName}>
										<Input name={name} context={context} />
									</div>)}
							
						</div>
					</div>)
}


ConditionalInput.propTypes = {
	name: PropTypes.string.isRequired,
	inputContainerClassName: PropTypes.string,
	context: PropTypes.object.isRequired,
	checkbox: PropTypes.object
}

ConditionalInput.defaultProps = {
	checkbox: {}
}