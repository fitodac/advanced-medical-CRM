import { useEffect, useState } from 'react'
import { 
	PageHeader,
	Loading
} from '../components'
import { 
	useAxios,
	useAppContext 
} from '../hooks'

import { Button, Alert } from '../components/Ui'

export default function Page(){

	const { API_URI, token, user: {info: {role}} } = useAppContext()
	const [ loading, setLoading ] = useState(false)

	const { 
		response, 
		// error, 
		// loading: loadingDocument, 
		refetch 
	} = useAxios({
		url: `${API_URI}/export`,
		method: 'GET',
		token,
		init: 0
	})

	const generateXLS = () => {
		setLoading(true)
		refetch()
	}

	useEffect(() => {
		if(response?.success){
			window.open(response.data, '_blank')
			setLoading(false)
		}
	}, [response])


	return (<>
		<PageHeader 
			title="Exportar datos"
			breadcrumbs={[
				{title: 'Exportar datos', current: true}
			]} />

			{('superadmin' === role || 'admin' === role) ? (
				<div className="py-10 items-center max-w-4xl">
					<div className="bg-white border border-slate-100 p-6 rounded-xl shadow-lg">
						<Button 
							className="btn btn-lg bg-green-600 border-green-600 text-white space-x-2"
							onClick={generateXLS}>
							<span className="text-3xl">
								<i className="ri-file-excel-2-line"></i>
							</span>
							<span>Descargar XLS</span>
						</Button>
					</div>
				</div>
			):(
				<Alert type="error" data={{message: 'No estás autorizado para ejecutar esta acción'}} />
			)}

		{loading && <Loading />}
	</>)
}