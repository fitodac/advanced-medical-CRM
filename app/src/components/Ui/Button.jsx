import PropTypes from 'prop-types'


Button.propTypes = {
  children: PropTypes.node.isRequired,
	className: PropTypes.string
}

export default function Button(props){

	const { children, className } = props

	return (<button className={className ? `btn ${className}` : 'btn'}>{children}</button>)
}