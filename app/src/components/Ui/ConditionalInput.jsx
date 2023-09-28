import { useState } from 'react'

import PropTypes from 'prop-types'
import { Input } from '.'


export const ConditionalInput = ({
	label,
	context,
	inputContainerClassName
}) => {

	const [ input_visible, setInputVisible ] = useState(false)

	const handleInputVisibility = () => setInputVisible(!input_visible)

	return (<div className="flex gap-x-6 items-start">
						<label className="input-checkbox">
							<input type="checkbox" onChange={handleInputVisibility} />
							<span>{label}</span>
						</label>

						<div className="flex-1 relative -top-1">
							{ input_visible 
							&& (<div className={inputContainerClassName}>
										<Input name="name" context={context} />
									</div>)}
							
						</div>
					</div>)
}


ConditionalInput.propTypes = {
	label: PropTypes.string,
	inputContainerClassName: PropTypes.string,
	context: PropTypes.object.isRequired
}