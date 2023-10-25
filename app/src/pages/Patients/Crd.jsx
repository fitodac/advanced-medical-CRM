import { 
	useState, 
	useEffect, 
	useRef
} from 'react'
import { useLoaderData } from 'react-router-dom'
import { useAxios } from '../../hooks'
import { useAppContext } from '../../hooks'

import { Loading, PageHeader } from '../../components'
import { Sidebar } from './components'
import { FormInitial, FormFirst } from './forms'


export async function loader({params}){ 
	return {
		...params,
		id: parseInt(params.id)
	}
}


export default function Page(){
	
	const { API_URI, token } = useAppContext()
	const { id } = useLoaderData()
	const [ patient, setPatient ] = useState({id: id, name: ''})
	const [ formType, setFormType ] = useState('initial')
	const [ formData, setFormData ] = useState(null)
	const [ formMessages, setFormMessages ] = useState(null)
	const [ loading, setLoading ] = useState(false)
	const firstFooter = useRef(null)
	const initialFooter = useRef(null)



	// Get patient data
	const {
		response,
		loading: getPatientLoading,
		// error,
	} = useAxios({
		url: `${API_URI}/patient`,
		method: 'POST',
		body: {id},
		token,
	})



	useEffect(() => {
		if( response?.success ){
			const { code } = response.data.patient
			
			setPatient(patient => ({
				...patient, 
				code,
			}))

			setFormMessages({...response.data.messages})
			setFormData([...response.data.patient.visits])
		}
	}, [response])


	useEffect(() => setLoading(getPatientLoading), [getPatientLoading])
	// Get patient


	useEffect(() => {
		return () => sessionStorage.clear()
	}, [])


	return (<>
		<PageHeader 
			title="CRD"
			breadcrumbs={[
				{title: 'Lista de pacientes', link: '/patients'},
				{title: 'CRD', current: true}
			]} />

		<div className="border-t -mx-6 mt-6"></div>

		<section className="max-w-7xl -mb-5 xl:mr-0">
			<div className="lg:grid lg:grid-cols-5 lg:gap-x-10">
				<Sidebar setFormType={val => { setFormType(val) }} />

				<div className="col-span-4 max-h-[80.5vh] scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100 pt-4 pb-28 pr-10 xl:pr-14">

					{formType === 'initial' 
					&& (
						<>
							<FormInitial 
								patient={patient} 
								formData={formData}
								formMessages={formMessages?.initial} />
							<div ref={initialFooter} />
						</>
					)}


					{formType === 'first' 
					&& (
						<>
							<FormFirst 
								patient={patient} 
								formData={formData}
								formMessages={formMessages?.first} />
							<div ref={firstFooter} />
						</>
					)}

				</div> 
			</div>
		</section>

		{loading && (<Loading />)}
		
	</>)
}