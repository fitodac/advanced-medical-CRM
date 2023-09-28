import { useContext } from 'react'
import PropTypes from 'prop-types'
import { InputDate } from '../../../components/Ui'

const id = 'fechaNacimiento'

export const FechaNacimiento = ({context}) => {

	const formContext = useContext(context)
	const { gender } = formContext.patient

	return (<section className="grid grid-cols-3 gap-x-10 justify-between" id={id}>
		<InputDate label="Fecha de nacimiento" name="birth_date" context={context} />

		<div className="">
			<label>Sexo</label>
			<div className="capitalize">{gender}</div>
		</div>
	</section>)
}


FechaNacimiento.propTypes = {
	context: PropTypes.object.isRequired
}