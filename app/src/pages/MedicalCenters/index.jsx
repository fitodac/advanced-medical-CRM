import { useState, createContext } from 'react'
import { useAxios } from '../../hooks'
import { useAppContext } from '../../hooks'
import { FilterProvider, CentersFilter } from '../../components/Filters'

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
	{ title: 'Código' },
	{ title: 'Nombre' },
	{ title: 'Acciones', class: 'text-end' },
]

const dateFormat = date => new Intl.DateTimeFormat('es', {dateStyle: 'medium'}).format(new Date(date))

// eslint-disable-next-line react-refresh/only-export-components
export const pageContext = createContext({})

export default function Page(){

	const { API_URI, token } = useAppContext()
	const [ request, setRequest ] = useState(`${API_URI}/center/list`)

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
			title="Listado de centros médicos"
			buttons={[{text: 'Nuevo centro médico', link: '/medical-centers/new'}]}
			breadcrumbs={[
				{title: 'Lista de centros médicos', current: true}
			]} />

		<pageContext.Provider value={contextValue}>
			<section className="w-full overflow-x-hidden pt-5">
				{ loading && (<Loading />)}

				{ !loading && error && <Alert type="error" data={error} /> }

				
				{ !loading && !error && 
				(<>
					<FilterProvider>
						<CentersFilter filter={requestUpdate} />
					</FilterProvider>

					{response?.data && (
						<Table header={thead} pager={response.data.links} context={pageContext}>
							{response.data.data.map(({id, code, name, created_at}) => (
							<tr key={id}>
								<td>
									<span className="text-slate-300 text-xs">{id}</span>
								</td>
								<td>{code}</td>
								<td className="leading-none">
									<div className="text-lg font-semibold leading-none">{name}</div>
									<small className="text-slate-400 text-xs font-light">creado el {dateFormat(created_at)}</small>
								</td>
								<td>
									<div className="flex gap-x-2 justify-end h-full">
										<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/medical-centers/edit/${id}`}>Editar</ButtonLink>
										<Delete 
											id={id} 
											url={`${API_URI}/center/delete/${id}`}
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