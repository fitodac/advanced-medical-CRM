/**
 * CheckboxGroup 
 * Muestra una lista de checkboxes con el agregado adicional 
 * de una sección de texto descriptivo.
 */
import PropTypes from 'prop-types'


export const CheckboxGroup = ({
	options
}) => {

	return (<div className="space-y-6">
		{ options && options.map((e) => (<div key={e?.text} className="flex gap-5 items-start">
				{ e?.options && e?.options.map(choice => (<label key={choice.value} className="input-checkbox">
																		<input type="checkbox" />
																		<span>{choice.label}</span>
																	</label>))}
			
			<div className="text-slate-500 leading-tight pl-4">{e?.text}</div>
		</div>)) }
	</div>)

}


CheckboxGroup.propTypes = {
	options: PropTypes.array
}