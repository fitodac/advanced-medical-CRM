import PropTypes from 'prop-types'
import { InputMask } from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/antropometria'

const id = 'L2M3N4'

export const Antropometria = ({context}) => {
	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup title="Antropometría" required />

			{fields.map(({name, label, append}) => (
			<AlertMessage key={label} name={name} context={context}>
				<div key={label} className="grid grid-cols-12 gap-x-4">
					<div className="col-span-3 flex items-center">
						<label className="text-sm leading-none font-normal w-full block select-none">{label}</label>
					</div>
					
					<div className="col-span-2 lg:col-span-2">
						<InputMask name={name} context={context} />
					</div>
					
					<div className="col-span-3 flex items-center">
						<label className="leading-none w-full block select-none">{append}</label>
					</div>
				</div>
			</AlertMessage>
			))}
		</section>
	</>)
}


Antropometria.propTypes = {
	context: PropTypes.object.isRequired
}