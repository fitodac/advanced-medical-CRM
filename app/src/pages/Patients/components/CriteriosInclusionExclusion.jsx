import PropTypes from 'prop-types'
import { RadioGroup } from '../../../components/Ui'
import { 
	HeaderFieldGroup
} from '.'

import fields from '../formfields/criteriosInclusionExclusion'
import { useState, useContext } from 'react'

const id = 'G5H6I7'


export const CriteriosInclusionExclusionExclusion = ({context}) => {

	const formContext = useContext(context)

	const inclusion_criteria_values = fields.criteriosDeInclusion.map(e => formContext.formState[e.options[0].name])
	const exclusion_criteria_values = fields.criteriosDeExclusion.map(e => formContext.formState[e.options[0].name])
	const inclusion_criteria_errors = inclusion_criteria_values.filter(e => e !== 'y').length
	const exclusion_criteria_errors = exclusion_criteria_values.filter(e => e !== 'n').length

	return (<>
		<section className="space-y-7" id={id}>
			<div className="space-y-3">
				<HeaderFieldGroup title="Criterios de inclusión" />

				<div className={inclusion_criteria_errors ? 'bg-pink-50 bg-opacity-30 border-l-8 border-pink-400 px-3 py-2 transition-all rounded-r-lg' : ''}>
					<RadioGroup 
						options={fields.criteriosDeInclusion} 
						context={context} />

					{inclusion_criteria_errors ? (
						<div className="text-pink-500 text-sm leading-tight mt-1">Compruebe la información. No se cumplen los criterios de inclusión</div>
					) : null}
				</div>
			</div>
			
			<div className="space-y-3">
				<HeaderFieldGroup title="Criterios de exclusión" />

				<div className={exclusion_criteria_errors ? 'bg-pink-50 bg-opacity-30 border-l-8 border-pink-400 px-3 py-2 transition-all rounded-r-lg' : ''}>
					<RadioGroup 
						options={fields.criteriosDeExclusion} 
						context={context} />

					{exclusion_criteria_errors ? (
						<div className="text-pink-500 text-sm leading-tight mt-1">Compruebe la información. No se cumplen los criterios de exclusión</div>
					) : null}
				</div>
			</div>
		</section>
	</>)
}


CriteriosInclusionExclusionExclusion.propTypes = {
	context: PropTypes.object.isRequired
}