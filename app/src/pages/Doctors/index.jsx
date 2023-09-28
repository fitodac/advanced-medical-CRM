import { useState, createContext } from 'react'
import { useAxios } from '../../hooks'
import { useAppContext } from '../../App'

import Loading from '../../components/Loading'
import PageHeader from '../../components/PageHeader'
import { 
	Button,
	ButtonLink, 
	Alert 
} from '../../components/Ui'
import { Table } from '../../components/Table'

const thead = [
	{ title: '#' },
	{ title: 'Nombre' },
	{ title: 'Especialidad' },
	{ title: 'Usuario' },
	{ title: 'Centro' },
	{ title: 'Acciones', class: 'text-end' },
]

// eslint-disable-next-line react-refresh/only-export-components
export const pageContext = createContext({})

export default function Page(){

	const { API_URI, token } = useAppContext()
	const [ request, setRequest ] = useState(`${API_URI}/doctors/`)

	const { response, error, loading } = useAxios({
		url: request,
		method: 'POST',
		token
	})

	const requestUpdate = url => setRequest(url)

	const contextValue = {requestUpdate}

	return (<>
		<PageHeader 
			title="Doctores"
			buttons={[{text: 'Nuevo doctor', link: '/doctors/new'}]}
			breadcrumbs={[
				{title: 'Lista de doctores', current: true}
			]} />

		<pageContext.Provider value={contextValue}>
			<section className="w-full overflow-x-hidden pt-5">
				{ loading && (<Loading />)}

				{ !loading && error && <Alert type="error" data={error} /> }


				{ !loading && !error && 
				(<div className="max-w-full h-full overflow-x-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100">
					<Table header={thead} pager={response.data.links} context={pageContext}>
						{ response?.data 
							? response.data.data.map(({id, user, specialty, center}) => (<tr key={id}>
								<td className="text-slate-300">{user.id}</td>

								<td>
									{ user.firstname || user.lastname
									? (<div className="font-semibold">{`${user.firstname} ${user.lastname}`}</div>)
									: (<div className="text-slate-300">sin datos</div>)}
									<small className="text-slate-400 text-xs font-light">{user.email}</small>
								</td>
								
								<td><span className="text-slate-500 text-sm">{specialty.name}</span></td>
								<td>{user.name}</td>
								<td>{center.name}</td>
								<td>
									<div className="flex gap-x-2 justify-end h-full">
										<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/doctors/edit/${user.id}`}>Editar</ButtonLink>
										<>
											<label className="btn btn-sm bg-red-700 border-red-700 text-white" htmlFor={`modal-${user.id}`}>Borrar</label>
											<input type="checkbox" id={`modal-${user.id}`} className="hidden" />
											<div className="overlay">
												<div className="modal w-96 space-y-3 p-3">
													<div className="text-center space-y-1">
														<div className="">Estás por eliminar al doctor</div>
														<div className="text-xl font-semibold">{user.firstname || user.lastname ? `${user.firstname} ${user.lastname}` : user.name}</div>
													</div>

													<div className="flex justify-betwee gap-x-3 pt-3">
														<div className="flex-1">
															<Button className="bg-red-700 border-red-700 text-white w-full">Lo quiero borrar</Button>
														</div>
														
														<div className="flex-1">
															<label className="btn w-full" htmlFor={`modal-${user.id}`}>Cancelar</label>
														</div>
													</div>
												</div>
											</div>
										</>
									</div>
								</td>
							</tr>))
							: null }
					</Table>
				</div>)}
				
			</section>
		</pageContext.Provider>
	</>)
}