import { useContext } from 'react'
import PropTypes from 'prop-types'
import { InputDate } from '../../../components/Ui'

const id = 'M1N2O3'

export const FechaNacimiento = ({context}) => {

	const formContext = useContext(context)

	const handleChange = e => {
		const {name, value} = e.target
		formContext.handleInputChange({target: {name, value}})
	}

	return (<section className="grid grid-cols-3 gap-x-10 justify-between" id={id}>
		
		<InputDate 
			label="Fecha de nacimiento" 
			name="birth_date" 
			context={context} />


		<div className="space-y-1">
			<label>Sexo</label>
			<div className="flex gap-x-6">
				<label className="input-checkbox">
				
					<input 
						type="radio" 
						name="gender" 
						defaultValue="hombre"
						onChange={handleChange}
						checked={formContext.formState.gender === 'hombre'} />

					<span>Hombre</span>
		
				</label>

				<label className="input-checkbox">
				
					<input 
						type="radio" 
						name="gender" 
						defaultValue="mujer"
						onChange={handleChange}
						checked={formContext.formState.gender === 'mujer'} />

					<span>Mujer</span>
		
				</label>
			</div>
		</div>

	</section>)
}


FechaNacimiento.propTypes = {
	context: PropTypes.object.isRequired
}