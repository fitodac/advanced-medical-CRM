import PropTypes from 'prop-types'
import { RadioGroup } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/criteriosInclusionExclusion'

const id = 'G5H6I7'


export const CriteriosInclusionExclusionExclusion = ({context}) => {

	return (<>
		<section className="space-y-7" id={id}>
			<div className="space-y-3">
				<HeaderFieldGroup title="Criterios de inclusión" />
				<RadioGroup 
					options={fields.criteriosDeInclusion} 
					context={context} />
			</div>
			
			<div className="space-y-3">
				<HeaderFieldGroup title="Criterios de exclusión" />
				<RadioGroup 
					options={fields.criteriosDeExclusion} 
					context={context} />
			</div>
		</section>
	</>)
}


CriteriosInclusionExclusionExclusion.propTypes = {
	context: PropTypes.object.isRequired
}