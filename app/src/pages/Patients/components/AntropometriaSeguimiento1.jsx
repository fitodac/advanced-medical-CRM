import PropTypes from 'prop-types'
import { Input } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/antropometriaSeguimiento1'

const id = 'U3V4W5'

export const AntropometriaSeguimiento1 = ({context}) => {
	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup title="Antropometría" />

			{fields.map(({name, label, append}) => (<div key={label} className="grid grid-cols-12 gap-x-4">
				<div className="col-span-3 flex items-center">
					<label className="text-sm leading-none font-normal w-full block select-none">{label}</label>
				</div>
				
				<div className="col-span-2 lg:col-span-2">
					<Input name={name} context={context} />
				</div>
				
				<div className="col-span-3 flex items-center">
					<label className="leading-none w-full block select-none">{append}</label>
				</div>
			</div>))}

			<div className="text-slate-400 text-xs">*En caso de que el seguimiento se realice de manera remota (telefónicamente, se pedirá al paciente/cuidador que comunique los datos)</div>
		</section>
	</>)
}


AntropometriaSeguimiento1.propTypes = {
	context: PropTypes.object.isRequired
}