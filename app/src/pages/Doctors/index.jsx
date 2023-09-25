import { useState, useEffect } from 'react'
import { List } from '../../api/doctor'
import { useAuth, kickOut } from '../../hooks/useAuth'

import PageHeader from '../../components/PageHeader'
import { Button, ButtonLink } from '../../components/Ui'

export async function loader(){ return null }


export default function Page(){

	const { user: {token_type, token} } = useAuth()
	const [list, setList] = useState(null)


	useEffect(() => {
		const getData = async () => {
			const resp = await List(`${token_type} ${token}`)
			kickOut(resp)
			setList({...resp})
		}

		getData()
	}, [])


	return (<>
		<PageHeader 
			title="Doctores"
			buttons={[{text: 'Nuevo doctor', link: '/doctors/new'}]}
			breadcrumbs={[
				{title: 'Lista de doctores', current: true}
			]} />

		<section className="w-full overflow-x-hidden pt-5">
			<div className="max-w-full h-full overflow-x-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100">
				<table className="table table-striped hoverable">
					<thead>
						<tr>
							<th>#</th>
							<th>Nombre</th>
							<th>Especialidad</th>
							<th>Usuario</th>
							<th>Centro</th>
							<th>
								<div className="text-end">Acciones</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{ list?.data 
							? list.data.map((row, i) => (<tr key={i}>
								<td className="text-slate-300">{row.user.id}</td>

								<td>
									{ row.user.firstname || row.user.lastname
									? (<div className="font-semibold">{`${row.user.firstname} ${row.user.lastname}`}</div>)
									: (<div className="text-slate-300">sin datos</div>)}
									<small className="text-slate-400 text-xs font-light">{row.user.email}</small>
								</td>
								
								<td>{row.specialty}</td>
								<td>{row.user.name}</td>
								<td>{row.center.name}</td>
								<td>
									<div className="flex gap-x-2 justify-end h-full">
										<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/doctors/edit/${row.user.id}`}>Editar</ButtonLink>
										{/* Delete */}
										<>
											<label className="btn btn-sm bg-red-700 border-red-700 text-white" htmlFor={`modal-${row.user.id}`}>Borrar</label>
											<input type="checkbox" id={`modal-${row.user.id}`} className="hidden" />
											<div className="overlay">
												<div className="modal w-96 space-y-3 p-3">
													<div className="text-center space-y-1">
														<div className="">Estás por eliminar al doctor</div>
														<div className="text-xl font-semibold">{row.user.firstname || row.user.lastname ? `${row.user.firstname} ${row.user.lastname}` : row.user.name}</div>
													</div>

													<div className="flex justify-betwee gap-x-3 pt-3">
														<div className="flex-1">
															<Button className="bg-red-700 border-red-700 text-white w-full">Lo quiero borrar</Button>
														</div>
														
														<div className="flex-1">
															<label className="btn w-full" htmlFor={`modal-${row.user.id}`}>Cancelar</label>
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
			</div>
		</section>
	</>)
}