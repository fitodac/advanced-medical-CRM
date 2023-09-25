import PropTypes from 'prop-types'

export const Button = (props) => {

	const { children, className } = props

	return (<button className={className ? `btn ${className}` : 'btn'}>{children}</button>)
}


Button.propTypes = {
  children: PropTypes.node.isRequired,
	className: PropTypes.string
}