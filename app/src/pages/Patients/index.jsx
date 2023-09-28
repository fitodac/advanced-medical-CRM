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
	{ title: 'ID' },
	{ title: 'Nombre' },
	{ title: 'Género', class: 'text-center' },
	{ title: 'Doctor' },
	{ title: 'Acciones', class: 'text-end' },
]

// eslint-disable-next-line react-refresh/only-export-components
export const pageContext = createContext({})

export default function Page(){

	const { API_URI, token, user: {info: {role}} } = useAppContext()
	const [ request, setRequest ] = useState(`${API_URI}/patient/list/`)

	const { response, error, loading } = useAxios({
		url: request,
		method: 'POST',
		token
	})

	const requestUpdate = url => setRequest(url)

	const contextValue = {requestUpdate}

	return (<>
		<PageHeader 
			title="Listado de pacientes"
			buttons={'doctor' === role ? [{text: 'Nuevo paciente', link: '/patients/new'}] : null}
			breadcrumbs={[
				{title: 'Lista de pacientes', current: true}
			]} />

		<pageContext.Provider value={contextValue}>
			<section className="w-full overflow-x-hidden pt-5">
				{ loading && (<Loading />)}

				{ !loading && error && <Alert type="error" data={error} /> }


				{ !loading && !error && 
				(<div className="max-w-full h-full overflow-x-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100">
					<Table header={thead} pager={response.data.links} context={pageContext}>
						{ response?.data 
						? response.data.data.map(({id, code, name, lastname, gender, doctor, center}) => (<tr key={id}>
							<td className="text-slate-300">{id}</td>
							<td>{code}</td>
							<td className="font-semibold">{`${name} ${lastname}`}</td>
							<td className="text-center">{'mujer' === gender ? 'M' : 'H'}</td>
							<td className="leading-none">
								{ doctor 
									? doctor.user.firstname || doctor.user.lastname ? (<div className="text-slate-500 whitespace-nowrap text-ellipsis">{doctor.user.firstname} {doctor.user.lastname}</div>) : (<div>{doctor.user.name}</div>)
									: (<div className="text-slate-300">sin datos</div>) }
								
								{ center 
								? (<small className="text-slate-500 text-xs font-light">{center.name}</small>)
								: (<small className="text-slate-300 text-xs font-light">sin datos</small>) }
							</td>
							<td>
								<div className="flex gap-x-2 justify-end h-full">
									{ 'doctor' === role && <ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/crd/${id}/initial`}>CRD</ButtonLink> }
									<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/patients/edit/${id}`}>Editar</ButtonLink>
									<>
										<label className="btn btn-sm bg-red-700 border-red-700 text-white" htmlFor={`modal-${id}`}>Borrar</label>
										<input type="checkbox" id={`modal-${id}`} className="hidden" />
										<div className="overlay">
											<div className="modal w-96 space-y-3 p-3">
												<div className="text-center space-y-1">
													<div className="">Estás por eliminar</div>
													<div className="text-xl font-semibold">{name}</div>
												</div>

												<div className="flex justify-betwee gap-x-3 pt-3">
													<div className="flex-1">
														<Button className="bg-red-700 border-red-700 text-white w-full">Lo quiero borrar</Button>
													</div>
													
													<div className="flex-1">
														<label className="btn w-full" htmlFor={`modal-${id}`}>Cancelar</label>
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