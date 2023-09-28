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
				<span className="text-slate-600 text-base font-medium">{fields.bioimpedanciaElectrica.label}</span>
			</label>


			{fields.bioimpedanciaElectrica.options.map(({name, label, append}) => (<div key={label} className="grid grid-cols-12 gap-x-4">
				<div className="col-span-4 flex items-center">
					<label className="text-sm leading-none font-normal w-full block select-none" dangerouslySetInnerHTML={label}/>
				</div>
				
				<div className="col-span-2 lg:col-span-2">
					<Input name={name} context={context} />
				</div>
				
				<div className="col-span-3 flex items-center">
					<label className="leading-none w-full block select-none">{append}</label>
				</div>
			</div>))}

			<div className="text-slate-500 text-sm leading-tight pt-4 space-y-2">
				<p>† Masa celular (kg) dividido por altura (BCM/h) en metros, cuyo valor normal es entre 14-21 en varones y entre 10-17 en mujeres.</p>
				<p>* Desviación del ángulo de fase con respecto a su grupo etario. Parámetro estadístico que expresa la relación entre el ángulo de fase menos el ángulo de fase medio y su desviación estándar. Este parámetro es útil para comprender si el valor del ángulo de fase relacionado con la edad de la persona es superior o inferior al de referencia.</p>
			</div>





		</section>
	</>)
}


OtrasMedicionesDeComposicionCorporal.propTypes = {
	context: PropTypes.object.isRequired
}