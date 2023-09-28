import PropTypes from 'prop-types'
import { 
	CheckboxList,
	ConditionalInput
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/tipoTratamientoNutricionalIndicado'

export const TipoTratamientoNutricionalIndicado = ({context}) => {

	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	title="Tipo de tratamiento nutricional indicado" />

			{fields.map(({key, name, value, label, options}) => (<div key={key} className="">
				<label className="input-checkbox">
					<input type="checkbox" name={name} defaultValue={value} />
					<span dangerouslySetInnerHTML={label} />
				</label>

				{options && (<div className="pt-2 pb-3 pl-8">
					<CheckboxList options={options} />
				</div>)}
			</div>))}
			
			<ConditionalInput label="Otro (especifique)" context={context} />
		</section>
	</>)

}


TipoTratamientoNutricionalIndicado.propTypes = {
	context: PropTypes.object.isRequired
}