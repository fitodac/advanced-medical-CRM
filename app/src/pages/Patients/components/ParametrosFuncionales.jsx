import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { 
	InputMask
} from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/parametrosFuncionales'

const id = 'K5L6M7'

export const ParametrosFuncionales = ({context}) => {

	const formContext = useContext(context)

	const chk1 = formContext.formState[fields[0][1].name]
	const chk2 = formContext.formState[fields[1][1].name]

	useEffect(() => {
		if( 'y' === chk1 ) formContext.handleInputChange({target: {name: fields[0][0].name, value: ''}})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chk1])
	
	useEffect(() => {
		if( 'y' === chk2 ) formContext.handleInputChange({target: {name: fields[1][0].name, value: ''}})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chk2])


	const handleChange = (e) => {
		const {name, checked} = e.target
		formContext.handleInputChange({target: {name, value: checked ? 'y' : 'n'}})
	}


	return (
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup	
				title="Parámetros funcionales"
				subtitle="(Detalle de los valores obtenidos)" />

			<div className="space-y-5">
				{fields.map(e => (
					<AlertMessage key={e[0].name} name={e[0].name} context={context}>
						<div className="space-y-2">
							<div className="grid grid-cols-9 gap-x-2">
								<div className="col-span-4 flex items-center">
									<label className="text-sm font-normal select-none">{e[0].label}</label>
								</div>
								{'y' !== formContext.formState[e[1].name] && (
								<>
									<div className="col-span-1">
										<InputMask name={e[0].name} context={context} />
									</div>
									<div className="col-span-1 flex items-center">
										<label className="text-sm font-normal select-none">{e[0].append}</label>
									</div>
								</>
								)}
							</div>

							<label className="input-checkbox">
								<input 
									type="checkbox" 
									name={e[1].name} 
									onChange={handleChange}
									defaultValue={e[1].value}
									// defaultChecked={formContext.formState[e[2].name] === e[2].value} 
									/>

									<span>{e[1].label}</span>

							</label>
						</div>
					</AlertMessage>
				))}
			</div>
		</section>
	)
}


ParametrosFuncionales.propTypes = {
	context: PropTypes.object.isRequired
}