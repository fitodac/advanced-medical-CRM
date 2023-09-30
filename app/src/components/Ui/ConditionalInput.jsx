import { 
	useState, 
	useEffect, 
	useContext 
} from 'react'
import PropTypes from 'prop-types'
import { Input } from '.'


export const ConditionalInput = ({
	name,
	context,
	inputContainerClassName,
	checkbox
}) => {

	const formContext = useContext(context)
	const [ input_visible, setInputVisible ] = useState(false)
	const { 
		name: chkName, 
		value: chkValue, 
		label 
	} = checkbox
	
	const [ chkState, setChkState ] = useState(chkValue)

	useEffect(() => {
		if( chkName ){
			formContext.handleInputChange({target: {name: chkName, value: chkState}})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chkState])

	const handleCheck = e => {
		const { checked } = e.target

		if( checked ){
			setChkState(chkValue)
		}else{
			setChkState('')
			formContext.handleInputChange({target: {name, value: ''}})
		}

		setInputVisible(!input_visible)
	}


	return (<div className="flex gap-x-6 items-start">
						<label className="input-checkbox">
							<input 
								type="checkbox" 
								name={chkName} 
								onChange={handleCheck}
								defaultValue={chkValue} />
							<span>{label}</span>
						</label>

						<div className="flex-1 relative -top-1">
							{ input_visible 
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