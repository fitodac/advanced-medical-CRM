import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/otrasMedicionesDeComposicionCorporal'


export const OtrasMedicionesDeComposicionCorporal = ({context}) => {
	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup title="Otras medidas de composición corporal" />


			<label className="input-checkbox">
				<input type="checkbox" />
				<span>{fields.bioimpedanciaElectrica}</span>
			</label>


			{/* {fields.map(({name, label, append}) => (<div key={label} className="grid grid-cols-12 gap-x-4">
				<div className="col-span-3 flex items-center">
					<label className="text-sm text-right leading-none font-normal w-full block select-none">{label}</label>
				</div>
				
				<div className="col-span-2 lg:col-span-2">
					<Input name={name} context={context} />
				</div>
				
				<div className="col-span-3 flex items-center">
					<label className="leading-none w-full block select-none">{append}</label>
				</div>
			</div>))} */}
		</section>
	</>)
}


OtrasMedicionesDeComposicionCorporal.propTypes = {
	context: PropTypes.object.isRequired
}