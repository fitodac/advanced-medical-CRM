/**
 * CheckboxGroup 
 * Muestra una lista de checkboxes.
 */
import PropTypes from 'prop-types'

export const CheckboxList = ({
	options
}) => {

	return (<div className="space-y-3">
		{ options && options.map((e) => (<div key={e?.value} className="flex gap-6 items-start">
				<label className="input-checkbox">
					<input type="checkbox" />
					<span>{e.label}</span>
				</label>
			</div>))}
	</div>)

}


CheckboxList.propTypes = {
	options: PropTypes.array
}