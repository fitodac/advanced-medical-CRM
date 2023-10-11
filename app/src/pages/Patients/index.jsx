import { useState, createContext } from 'react'
import { useAxios } from '../../hooks'
import { useAppContext } from '../../hooks'
import { FilterProvider, PatientsFilter } from '../../components/Filters'

import {
	Loading,
	PageHeader,
	Delete
} from '../../components'
import {
	ButtonLink,
	Button,
	Alert
} from '../../components/Ui'
import { Table } from '../../components/Table'
import { useCreateNewPatient } from '../../hooks/useCreateNewPatient'

const thead = [
	{ title: '#' },
	{ title: 'ID' },
	{ title: 'Doctor' },
	{ title: 'Acciones', class: 'text-end' },
]

// eslint-disable-next-line react-refresh/only-export-components
export const pageContext = createContext({})

export default function Page(){

	const { API_URI, token, user } = useAppContext()
	const {info: {id, role}} = user
	const [ request, setRequest ] = useState(`${API_URI}/patient/list`)


	const { response, error, loading, refetch } = useAxios({
		url: request,
		method: 'GET',
		token
	})

	const requestUpdate = url => {
		setRequest(url)
		refetch()
	}

	const { 
		createNewPatient,
		createNewPatientLoading 
	} = useCreateNewPatient({
		API_URI, 
		user_id: id,
		token
	})

	const contextValue = {
		requestUpdate,
		request
	}

	return (<>

		<div className="flex justify-between">
			<PageHeader 
				title="Listado de pacientes"
				breadcrumbs={[
					{title: 'Lista de pacientes', current: true}
				]} />
			
			{'doctor' === role && (
			<div>
				<Button 
					className="bg-teal border-teal text-white"
					onClick={createNewPatient}>
					Nuevo paciente
				</Button>
			</div>
			)}
		</div>

		<pageContext.Provider value={contextValue}>
			<section className="w-full overflow-x-hidden pt-5">
				{ (loading || createNewPatientLoading) && (<Loading />)}

				{ !loading && error && <Alert type="error" data={error} /> }

				{ !loading && !error && 
				(<>
					{'doctor' !== role && (
						<FilterProvider>
							<PatientsFilter filter={requestUpdate} />
						</FilterProvider>
					)}

					{response?.data && (
						<Table header={'doctor' === role ? [...thead].filter(i => i.title !== 'Doctor') : thead} pager={response.data.links} context={pageContext}>
							{response.data.data.map(({id, code, gender, doctor, center}) => (
							<tr key={id}>
								<td>
									<span className="text-slate-300 text-xs">{id}</span>
								</td>
								<td>
									<span className="text-slate-500 text-sm font-bold">{code}</span>
								</td>
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
										{ 'doctor' === role && <ButtonLink className="btn-sm bg-teal border-teal text-white" link={`/crd/${id}`}>CRD</ButtonLink> }
										<Delete 
												id={id} 
												url={`${API_URI}/patient/delete/${id}`}
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