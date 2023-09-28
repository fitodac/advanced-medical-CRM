import PropTypes from 'prop-types'
import { 
	Input, 
	CheckboxList
} from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/parametrosFuncionales'

export const ParametrosFuncionales = ({context}) => {

	return (<>
		<section className="space-y-3">
			<HeaderFieldGroup	
				title="Parámtros funcionales"
				subtitle="(Detalle de los valores obtenidos)" />

			<div className="space-y-5">
				{ fields.map(e => (<div key={e[0]} className="space-y-2">
					<div className="grid grid-cols-9 gap-x-2">
						<div className="col-span-4 flex items-center">
							<label className="text-sm font-normal select-none">{e[1].label}</label>
						</div>
						<div className="col-span-1">
							<Input name={e[1].name} context={context} />
						</div>
						<div className="col-span-1 flex items-center">
							<label className="text-sm font-normal select-none">{e[1].append}</label>
						</div>
					</div>

					<CheckboxList options={[{...e[2]}]} />
					
				</div>)) }
			</div>
		</section>
	</>)

}


ParametrosFuncionales.propTypes = {
	context: PropTypes.object.isRequired
}