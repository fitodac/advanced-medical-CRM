import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const AlertMessage = ({
	children,
	context,
	name
}) => {

	const Context = useContext(context)
	const [ alert, setAlert ] = useState(null)

	useEffect(() => {
		if( Context.messages ) setAlert(Context.messages[name])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Context])


	return (
		<>
			<div className={alert && 'bg-pink-50 bg-opacity-30 border-l-8 border-pink-400 px-3 py-2 rounded-r-lg'}>

				{children}

				{alert && (
					<div className="text-pink-500 text-sm leading-tight mt-1">{Context.messages[name]}</div>
				)}
			</div> 
		</>
	)
}


AlertMessage.propTypes = {
	children: PropTypes.node.isRequired,
	context: PropTypes.object,
	name: PropTypes.string
}