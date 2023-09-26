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


const BadgeClassName = role => {
	switch(role){
		case 'admin': return 'badge ghost bg-primary border-primary text-primary'
		case 'doctor': return 'badge ghost bg-green-500 border-green-500 text-green-500'
	}
}


export default function Page(){

	const { user: {token_type, token} } = useAuth()
	const { API_URI } = useAppContext()

	const { response, error, loading } = useAxios({
		url: `${API_URI}/user/list/`,
		method: 'POST',
		token: `${token_type} ${token}`
	})


	return (<>
		<PageHeader 
			title="Listado de usuarios"
			buttons={[{text: 'Nuevo usuario', link: '/users/new'}]}
			breadcrumbs={[
				{title: 'Lista de usuarios', current: true}
			]} />

		<section className="w-full overflow-x-hidden pt-5">
			{ loading && (<div>cargando...</div>)}

			{ !loading && error && <Alert type="error" data={error} /> }

			{ !loading && !error && 
			(<div className="max-w-full h-full overflow-x-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100">
				<table className="table table-striped hoverable">
					<thead>
						<tr>
							<th>#</th>
							<th>Nombre</th>
							<th>Usuario</th>
							<th>Rol</th>
							<th>
								<div className="text-end">Acciones</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{ response?.data 
							? response.data.map(({id, name, firstname, lastname, role, created_at}) => (<tr key={id}>
								<td className="text-slate-300">{id}</td>
								<td>
									{ firstname || lastname 
									? (<div className="font-semibold leading-none">{`${firstname}${lastname ? ' '+ lastname : null}`}</div>)
									: (<div className="text-slate-300 leading-none">sin datos</div>)}
									
									<small className="text-slate-400 text-xs font-light">creado el {useDate(created_at)}</small>
								</td>
								<td>{name}</td>
								<td><span className={BadgeClassName(role)}>{role}</span></td>
								<td>
									<div className="flex gap-x-2 justify-end h-full">
										<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/users/edit/${id}`}>Editar</ButtonLink>
										{/* Delete */}
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
					</tbody>
				</table>
			</div>)}

		</section>
	</>)
}