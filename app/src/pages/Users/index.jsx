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
	{ title: 'Nombre' },
	{ title: 'Usuario' },
	{ title: 'Rol', class: 'text-center' },
	{ title: 'Acciones', class: 'text-end' },
]

const BadgeClassName = role => {
	switch(role){
		case 'admin': return 'badge ghost bg-sky-200 text-sky-500 border-primary text-primary'
		case 'doctor': return 'badge ghost bg-green-200 text-green-500'
	}
}

const dateFormat = date => new Intl.DateTimeFormat('es', {dateStyle: 'medium'}).format(new Date(date))

// eslint-disable-next-line react-refresh/only-export-components
export const pageContext = createContext({})

export default function Page(){

	const { API_URI, token } = useAppContext()
	const [ request, setRequest ] = useState(`${API_URI}/user/list/`)

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
			title="Listado de usuarios"
			buttons={[{text: 'Nuevo usuario', link: '/users/new'}]}
			breadcrumbs={[
				{title: 'Lista de usuarios', current: true}
			]} />

		<pageContext.Provider value={contextValue}>
			<section className="w-full overflow-x-hidden pt-5">
				{ loading && (<Loading />)}

				{ !loading && error && <Alert type="error" data={error} /> }

				{ !loading && !error && 
				(<div className="max-w-full h-full overflow-x-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100">
					<Table header={thead} pager={response.data.links} context={pageContext}>
						{ response?.data 
							? response.data.data.map(({id, name, firstname, lastname, role, created_at}) => (<tr key={id}>
								<td className="text-slate-300">{id}</td>
								<td>
									{ firstname || lastname 
									? (<div className="font-semibold leading-none">{`${firstname}${lastname ? ' '+ lastname : null}`}</div>)
									: (<div className="text-slate-300 leading-none">sin datos</div>)}
									
									<small className="text-slate-400 text-xs font-light">creado el {dateFormat(created_at)}</small>
								</td>
								<td>{name}</td>
								<td className="text-center"><span className={BadgeClassName(role)}>{role}</span></td>
								<td>
									<div className="flex gap-x-2 justify-end h-full">
										<ButtonLink className="btn-sm bg-primary border-primary text-white" link={`/users/edit/${id}`}>Editar</ButtonLink>
										<Delete 
											id={id} 
											url={`${API_URI}/user/delete/${id}`}
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