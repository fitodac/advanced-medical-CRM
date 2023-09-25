import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'


export const ButtonLink = (props) => {

	const {children, link, className} = props

	return (<NavLink className={className ? `btn ${className}` : 'btn'} to={link}>{children}</NavLink>)
}


ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
	link: PropTypes.string.isRequired,
	className: PropTypes.string
}