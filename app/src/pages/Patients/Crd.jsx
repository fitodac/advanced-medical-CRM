import { 
	useState, 
	useEffect, 
	createContext,
	useRef 
} from 'react'
import { useLoaderData } from 'react-router-dom'
import { useAxios } from '../../hooks'
import { useAppContext } from '../../App'

import { Loading, PageHeader } from '../../components'
import { Sidebar } from './components'
import { FormFirst, FormInitial } from './forms'

// eslint-disable-next-line react-refresh/only-export-components
export const formContext = createContext({})

export async function loader({params}){ 
	return {
		...params,
		id: parseInt(params.id)
	}
}


export default function Page(){
	
	const { API_URI, token } = useAppContext()
	const { id } = useLoaderData()
	const [ patient, setPatient ] = useState({id: id, name: '', gender: ''})
	const [ formType, setFormType ] = useState('first')
	const [ formData, setFormData ] = useState(null)
	const [ loading, setLoading ] = useState(true)
	const firstFooter = useRef(null)
	const initialFooter = useRef(null)

	
	const scrollToTheEnd = () => {
		switch(formType){
			case 'first':
				firstFooter.current.scrollIntoView({ behavior: 'smooth' })
				break;
			case 'initial':
				initialFooter.current.scrollIntoView({ behavior: 'smooth' })
				break;
		}
		return
	}


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
			const { name, lastname, gender } = response.data
			
			setPatient({
				...patient, 
				name: `${name} ${lastname}`,
				gender
			})

			setFormData([...response.data.visits])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response])

	useEffect(() => setLoading(getPatientLoading), [getPatientLoading])
	// Get patient



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
						{formType === 'first' 
						&& (<>
							<FormFirst patient={patient} formData={formData} />
							<div ref={firstFooter} />
						</>)}


						{formType === 'initial' 
						&& (<>
							<FormInitial patient={patient} formData={formData} />
							<div ref={initialFooter} />
						</>)}

					</div>
				</div>

			</section>


			{/* Scroll to the end of the "first" form */}
			{formType === 'first' 
			&& (<button 
						className="btn btn-icon bg-slate-400 border-slate-400 text-white bottom-10 right-10 absolute rounded-full"
						onClick={scrollToTheEnd}>
						<i className="ri-arrow-down-line top-0.5 relative"></i>
					</button>)}
			
			
			{/* Scroll to the end of the "initial" form */}
			{formType === 'initial'
			&& (<button
						className="btn btn-icon bg-slate-400 border-slate-400 text-white bottom-10 right-10 absolute rounded-full"
						onClick={scrollToTheEnd}>
						<i className="ri-arrow-down-line top-0.5 relative"></i>
					</button>)}

		{loading && (<Loading />)}
		
	</>)
}