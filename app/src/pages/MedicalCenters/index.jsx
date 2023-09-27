import { 
	useAuth, 
	useAxios,
	useDate
} from '../../hooks'
import { useAppContext } from '../../App'

import PageHeader from '../../components/PageHeader'
import {
	Button, 
	ButtonLink,
	Alert
} from '../../components/Ui'
import { Table } from '../../components/Table'

const thead = [
	{ title: '#' },
	{ title: 'Código' },
	{ title: 'Nombre' },
	{ title: 'Acciones', class: 'text-end' },
]


export default function Page(){

	const { user: {token_type, token} } = useAuth()
	const { API_URI } = useAppContext()

	const { response, error, loading } = useAxios({
		url: `${API_URI}/center/list/`,
		method: 'POST',
		token: `${token_type} ${token}`
	})


	return (<>
		<PageHeader 
			title="Listado de centros médicos"
			buttons={[{text: 'Nuevo centro médico', link: '/medical-centers/new'}]}
			breadcrumbs={[
				{title: 'Lista de centros médicos', current: true}
			]} />

		<section className="w-full overflow-x-hidden pt-5">
			{ loading && (<div>cargando...</div>)}

			{ !loading && error && <Alert type="error" data={error} /> }

			
			{ !loading && !error && 
			(<div className="max-w-full h-full overflow-x-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100">
				<Table header={thead} pager={response.data.links}>
					{ response?.data 
						? response.data.data.map(({id, code, name, created_at}) => (<tr key={id}>
							<td className="text-slate-300">{id}</td>
							<td>{code}</td>
							<td className="leading-none">
								<div className="text-lg font-semibold leading-none">{name}</div>
								<small className="text-slate-400 text-xs font-light">creado el {useDate(created_at)}</small>
							</td>
							<td>
								<div className="flex gap-x-2 justify-end h-full">
									<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/medical-centers/edit/${id}`}>Editar</ButtonLink>
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
	</>)
}