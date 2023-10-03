import PropTypes from 'prop-types'

export const Button = ({ children, className, type = 'submit', onClick }) => {
	return (<button 
		type={type} 
		onClick={onClick}
		className={className ? `btn ${className}` : 'btn'}>{children}</button>)
}


Button.propTypes = {
  children: PropTypes.node.isRequired,
	className: PropTypes.string,
	type: PropTypes.string,
	onClick: PropTypes.func
}