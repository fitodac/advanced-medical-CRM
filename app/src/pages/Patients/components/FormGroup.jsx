import PropTypes from 'prop-types'


export const FromGroup = ({children}) => {
	return (<div className="space-y-3">{children}</div>)
}


export const FromGroupContainer = ({children}) => {
	return (<div className="space-y-8">{children}</div>)
}


FromGroup.propTypes = {
	children: PropTypes.node.isRequired
}

FromGroupContainer.propTypes = {
	children: PropTypes.node.isRequired
}