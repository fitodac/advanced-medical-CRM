import PageHeader from '../components/PageHeader'

export default function Page(){
	return (<>
		<PageHeader 
			title="Exportar datos"
			breadcrumbs={[
				{title: 'Exportar datos', current: true}
			]} />
	</>)
}