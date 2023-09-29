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
		<Button 
			className="btn btn-sm bg-red-200 border-red-200 text-red-700" 
			onClick={() => setModal(true)}>Borrar</Button>
		
		<input type="checkbox" id={`modal-${id}`} className="hidden" checked={modal} onChange={() => {}} />
		
		<div className="overlay">
			<div className="modal bg-red-100 w-96 space-y-3 px-4 py-6">
				<div className="text-center space-y-1 leading-none">
					<div className="text-red-700 text-lg font-bold">Estás por eliminar un item</div>
					<div className="text-red-700">¿Estás seguro? Por favor, confirmalo ya que esta acción no podrá deshacerse.</div>
					<div className="text-xl font-semibold">{name}</div>
				</div>

				<div className="flex justify-betwee gap-x-3 pt-3">
					<div className="flex-1">
						<form onSubmit={confirmDeletion}>
							<Button className="bg-red-700 border-red-700 text-white w-full">Lo quiero borrar</Button>
						</form>
					</div>
					
					<div className="flex-1">
						<button 
							className="btn bg-white border-red-300 text-red-700 w-full" 
							onClick={() => setModal(false)}>Cancelar</button>
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