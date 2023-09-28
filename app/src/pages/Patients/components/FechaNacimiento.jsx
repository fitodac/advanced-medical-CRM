import PropTypes from 'prop-types'
import { InputDate } from '../../../components/Ui'


export const FechaNacimiento = ({context}) => {
	return (<InputDate label="Fecha de nacimiento" name="birth_date" context={context} />)
}


FechaNacimiento.propTypes = {
	context: PropTypes.object.isRequired
}