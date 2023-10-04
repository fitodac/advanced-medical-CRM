import { useState, useEffect, createContext } from 'react'
import { useAxios } from '../../hooks'
import { useAppContext } from '../../App'
import { FilterProvider, DoctorsFilter } from '../../components/Filters'

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
	const [ request, setRequest ] = useState(`${API_URI}/doctor/`)

	const { response, error, loading, refetch } = useAxios({
		url: request,
		method: 'GET',
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
				(<>
					<FilterProvider>
						<DoctorsFilter filter={requestUpdate} />
					</FilterProvider>

					{response?.data ?? (
						<Table header={thead} pager={response?.data?.links} context={pageContext}>
							{response.data.data.map(({id, user, specialty, center}) => (
							<tr key={id}>
								<td>
									<span className="text-slate-300 text-xs">{id}</span>
								</td>

								<td>
									{ user?.firstname || user?.lastname
									? (<div className="font-semibold">{`${user?.firstname} ${user?.lastname}`}</div>)
									: (<div className="text-slate-300">sin datos</div>)}
									<small className="text-slate-400 text-xs font-light">{user?.email}</small>
								</td>
								
								<td><span className="text-slate-500 text-sm">{specialty?.name}</span></td>
								<td>
									<div className="text-slate-500 text-sm">{user?.name}</div>
								</td>
								<td>{center?.name}</td>
								<td>
									<div className="flex gap-x-2 justify-end h-full">
										<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/doctors/edit/${user.id}`}>Editar</ButtonLink>
										<Delete 
											id={id} 
											url={`${API_URI}/doctor/delete/${id}`}
											context={pageContext} />
									</div>
								</td>
							</tr>
							))}
						</Table>
					)}
				</>)}
				
			</section>
		</pageContext.Provider>
	</>)
}