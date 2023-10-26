import { useContext } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
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


	const handleClick = e => {
		const {name, value} = e.target

		if( value === formContext.formState[name] ){
			formContext.handleInputChange({target: {name, value: ''}})
			e.target.checked = false
		}

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

				{options && (
				<div className="pt-2 pb-3 pl-8 space-y-2">
					{options.map(({
						key, 
						name, 
						value, 
						label
					}) => (
						<div key={key} className="w-full flex gap-x-3">
							<label 
								className="input-checkbox">

								<input 
									type="radio"
									name={name}
									defaultValue={value}
									onChange={handleChange}
									onClick={handleClick} />

								<span>{label}</span>
							</label>

							{key === 'nti__son__type_8' && formContext.formState.nti__son__option === 'Otras' && (
								<div className="w-full pb-1 pl-3 flex-1">
									<Input name="nti__son__other_description" context={context} />
								</div>
							)}


							{key === 'nti__en__option_8' && formContext.formState.nti__en__option === 'Otras' && (
								<div className="w-full pb-1 pl-3 flex-1">
									<Input name="nti__en__other_description" context={context} />
								</div>
							)}
						</div>
					))}
				</div>
				)}
			</AlertMessage>
			))}

			{/* <pre>{JSON.stringify(formContext.formState.nti__en__option, null, 2)}</pre> */}
		</section>
	</>)

}


TipoTratamientoNutricionalIndicado.propTypes = {
	context: PropTypes.object.isRequired
}