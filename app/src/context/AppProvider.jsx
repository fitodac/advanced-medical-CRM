import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '.'
import { useAuth } from '../hooks'
import { API_URI } from '../config'

const TOAST_TIME_OUT = 2400

export const AppProvider = ({children}) => {

	const [ toastContext, setToastContext ] = useState({
		show: false,
		status: '',
		message: ''
	})
	const { user } = useAuth()
	const { token_type, token } = user

	const notify = (message, status) => {
		setToastContext({
			show: true,
			status,
			message
		})
		setTimeout(() => {
			setToastContext({
				show: false,
				status: '',
				message: ''
			})
		}, TOAST_TIME_OUT)
	}


	return (
		<>
			<AppContext.Provider value={
				{
					user,
					API_URI,
					token: `${token_type} ${token}`,
					// methods
					notify
				}}>
				{children}
			</AppContext.Provider>


			{/* Toast */}
			<input 
				type="checkbox" 
				id="toast" 
				className="hidden"
				onChange={() => {}}
				checked={toastContext.show} />

			<label 
				htmlFor="toast" 
				className="toast bg-green-100 border-green-100 text-green-600 p-8 overflow-hidden shadow-2xl"
				onClick={() => setToastContext({show: false, status: '', message: ''})}>
				<div className="">{toastContext.message}</div>
			</label>
		</>
	)
}


AppProvider.propTypes = {
	children: PropTypes.node
}