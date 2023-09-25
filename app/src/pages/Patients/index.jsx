import { useState, useEffect } from 'react'
import { List } from '../../api/patients'
import { useAuth, kickOut } from '../../hooks/useAuth'

import PageHeader from '../../components/PageHeader'
import {Button, ButtonLink} from '../../components/Ui'

export async function loader(){ return null }

export default function Page(){

	const { user: {token_type, token, info: {role}} } = useAuth()
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
			title="Listado de pacientes"
			buttons={'doctor' === role ? [{text: 'Nuevo paciente', link: '/patients/new'}] : null}
			breadcrumbs={[
				{title: 'Lista de pacientes', current: true}
			]} />

		<section className="w-full overflow-x-hidden pt-5">
			<div className="max-w-full h-full overflow-x-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100">
				<table className="table table-striped hoverable">
					<thead>
						<tr>
							<th>#</th>
							<th>ID</th>
							<th>Nombre</th>
							<th>
								<div className="text-center">Género</div>
							</th>
							<th>Doctor</th>
							<th>
								<div className="text-end">Acciones</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{ list?.data 
							? list.data.map((row, i) => (<tr key={i}>
								<td className="text-slate-300">{row.id}</td>
								<td>{row.code}</td>
								<td className="font-semibold">{`${row.name} ${row.lastname}`}</td>
								<td className="text-center">{'mujer' === row.gender ? 'M' : 'H'}</td>
								<td className="leading-none">
									{ row.doctor 
									? row.doctor.firstname || row.doctor.lastname ? (<div className="whitespace-nowrap text-ellipsis">{row.doctor.firstname} {row.doctor.lastname}</div>) : (<div>{row.doctor.name}</div>)
									: (<div className="text-slate-300">sin datos</div>) }
									
									{ row.center 
									? (<small className="text-slate-500 text-xs font-light">{row.center.name}</small>)
									: (<small className="text-slate-300 text-xs font-light">sin datos</small>) }
								</td>
								<td>
									<div className="flex gap-x-2 justify-end h-full">
										<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/crd/${row.id}/initial`}>CRD</ButtonLink>
										<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/patients/edit/${row.id}`}>Editar</ButtonLink>
										{/* Delete */}
										<>
											<label className="btn btn-sm bg-red-700 border-red-700 text-white" htmlFor={`modal-${row.id}`}>Borrar</label>
											<input type="checkbox" id={`modal-${row.id}`} className="hidden" />
											<div className="overlay">
												<div className="modal w-96 space-y-3 p-3">
													<div className="text-center space-y-1">
														<div className="">Estás por eliminar</div>
														<div className="text-xl font-semibold">{row.name}</div>
													</div>

													<div className="flex justify-betwee gap-x-3 pt-3">
														<div className="flex-1">
															<Button className="bg-red-700 border-red-700 text-white w-full">Lo quiero borrar</Button>
														</div>
														
														<div className="flex-1">
															<label className="btn w-full" htmlFor={`modal-${row.id}`}>Cancelar</label>
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