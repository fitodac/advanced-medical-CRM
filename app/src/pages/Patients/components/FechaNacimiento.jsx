import { useContext } from 'react'
import PropTypes from 'prop-types'
import { InputDate } from '../../../components/Ui'

const id = 'M1N2O3'

export const FechaNacimiento = ({ context }) => {
	const formContext = useContext(context)

	const handleChange = (e) => {
		const { name, value } = e.target
		formContext.handleInputChange({ target: { name, value } })
	}

	return (
		<section className="grid grid-cols-3 gap-x-10 justify-between" id={id}>
			<InputDate
				label="Fecha de nacimiento (día/mes/año)"
				name="birth_date"
				context={context}
				required
			/>

			<div className="space-y-1">
				<label>
					Sexo
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="fill-red-600 w-3 pl-0.5 inline -top-1 relative"
					>
						<path d="M12.9993 3L12.9991 10.267L19.2935 6.63397L20.2935 8.36602L14.0001 11.999L20.2935 15.634L19.2935 17.366L12.9991 13.732L12.9993 21H10.9993L10.9991 13.732L4.70508 17.366L3.70508 15.634L9.99808 12L3.70508 8.36602L4.70508 6.63397L10.9991 10.267L10.9993 3H12.9993Z" />
					</svg>
				</label>
				<div className="flex gap-x-6">
					<label className="input-checkbox">
						<input
							type="radio"
							name="gender"
							defaultValue="hombre"
							onChange={handleChange}
							checked={formContext.formState.gender === 'hombre'}
						/>

						<span>Hombre</span>
					</label>

					<label className="input-checkbox">
						<input
							type="radio"
							name="gender"
							defaultValue="mujer"
							onChange={handleChange}
							checked={formContext.formState.gender === 'mujer'}
						/>

						<span>Mujer</span>
					</label>
				</div>
			</div>
		</section>
	)
}

FechaNacimiento.propTypes = {
	context: PropTypes.object.isRequired,
}
