import { useState, createContext } from 'react'
import { useAxios } from '../../hooks'
import { useAppContext } from '../../App'

import {
	Loading,
	PageHeader,
	Delete
} from '../../components'
import {
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

	const { response, error, loading, refetch } = useAxios({
		url: request,
		method: 'POST',
		token
	})

	const requestUpdate = url => {
		setRequest(url)
		refetch()
	}

	const contextValue = {
		requestUpdate,
		request
	}

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
					<Table header={'doctor' === role ? [...thead].filter(i => i.title !== 'Doctor') : thead} pager={response.data.links} context={pageContext}>
						{ response?.data 
						? response.data.data.map(({id, code, name, lastname, gender, doctor, center}) => (<tr key={id}>
							<td>
								<span className="text-slate-300 text-xs">{id}</span>
							</td>
							<td>
								<span className="text-slate-500 text-sm font-bold">{code}</span>
							</td>
							<td className="font-semibold">{`${name} ${lastname}`}</td>
							<td className="text-center">{'mujer' === gender ? 'M' : 'H'}</td>
							{ 'doctor' !== role 
							&& (<td className="leading-none">
										{ doctor 
											? doctor.user.firstname || doctor.user.lastname ? (<div className="text-slate-500 whitespace-nowrap text-ellipsis">{doctor?.user.firstname} {doctor?.user.lastname}</div>) : (<div>{doctor?.user.name}</div>)
											: (<div className="text-slate-300">sin datos</div>) }
										
										{ center 
										? (<small className="text-slate-500 text-xs font-light">{center?.name}</small>)
										: (<small className="text-slate-300 text-xs font-light">sin datos</small>) }
									</td>)}
							
							<td>
								<div className="flex gap-x-2 justify-end h-full">
									{ 'doctor' === role && <ButtonLink className="btn-sm bg-teal border-teal text-white" link={`/crd/${id}/crd`}>CRD</ButtonLink> }
									<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/patients/edit/${id}`}>Editar</ButtonLink>
									<Delete 
											id={id} 
											url={`${API_URI}/patient/delete/${id}`}
											context={pageContext} />
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