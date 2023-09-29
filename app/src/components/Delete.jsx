import { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Button } from './Ui'
import { useAxios } from '../hooks/'
import { useAppContext } from '../App'
import { Loading } from '.'


export const Delete = ({
	id,
	url,
	context
}) => {

	const { token } = useAppContext()
	const formContext = useContext(context)
	const [ modal, setModal ] = useState(false)
	const [ loadState, setLoadState ] = useState(false)

	const { response, error, loading, refetch } = useAxios({
			url,
			method: 'DELETE',
			token,
			init: 0
		})

	useEffect(() => {
		if( response?.success ){
			setLoadState(false)
			formContext.requestUpdate(formContext.request)
		}
	}, [response])


	const confirmDeletion = async e => {
		e.preventDefault()
		setModal(false)
		setLoadState(true)
		await refetch()
	}


	return (<>
		<label 
			className="btn btn-sm bg-red-700 border-red-700 text-white" 
			htmlFor={`modal-${id}`}
			onClick={() => setModal(true)}>Borrar</label>
		
		<input type="checkbox" id={`modal-${id}`} className="hidden" checked={modal} onChange={() => {}} />
		
		<div className="overlay">
			<div className="modal w-96 space-y-3 p-3">
				<div className="text-center space-y-1">
					<div className="">Estás por eliminar</div>
					<div className="text-xl font-semibold">{name}</div>
				</div>

				<div className="flex justify-betwee gap-x-3 pt-3">
					<div className="flex-1">
						<form onSubmit={confirmDeletion}>
							<Button className="bg-red-700 border-red-700 text-white w-full">Lo quiero borrar</Button>
						</form>
					</div>
					
					<div className="flex-1">
						<label className="btn w-full" htmlFor={`modal-${id}`}>Cancelar</label>
					</div>
				</div>
			</div>
		</div>

		{ loadState && (<Loading />) }
	</>)
}


Delete.propTypes = {
	id: PropTypes.number.isRequired,
	url: PropTypes.string.isRequired,
	context: PropTypes.object.isRequired
}