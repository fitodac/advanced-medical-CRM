import { PageHeader } from '../components'

const boxClassName = `bg-white border boder-slate-100 px-7 py-4 space-y-1 select-none 
											flex flex-col justify-between transition-all duration-300 rounded-md group 
											hover:bg-teal hover:border-teal hover:text-white`

export default function Page() {
	return (
		<>
			<PageHeader
				title="Documentos"
				breadcrumbs={[{ title: 'Documentos', current: true }]}
			/>

			<section className="w-full overflow-x-hidden pt-5">
				<div className="grid grid-cols-4 gap-8">
					<a
						href="/documents/protocolo-aep.pdf"
						target="_blank"
						rel="noreferrer"
						className={boxClassName}
						download
					>
						<div className="font-bold leading-tight">Protocolo</div>
						<div className="text-stone-600 text-xs pt-2 flex items-center justify-end gap-x-2 opacity-50">
							<i className="ri-download-2-fill ri-xl"></i> PDF
						</div>
					</a>

					<a
						href="/documents/crd-aep.pdf"
						target="_blank"
						rel="noreferrer"
						className={boxClassName}
						download
					>
						<div className="font-bold leading-tight">
							Formulario de registro de casos
						</div>
						<div className="text-stone-600 text-xs pt-2 flex items-center justify-end gap-x-2 opacity-50">
							<i className="ri-download-2-fill ri-xl"></i> PDF
						</div>
					</a>

					<a
						href="/documents/consentimiento-aep.pdf"
						target="_blank"
						rel="noreferrer"
						className={boxClassName}
						download
					>
						<div className="font-bold leading-tight">
							Consentimiento informado
						</div>
						<div className="text-stone-600 text-xs pt-2 flex items-center justify-end gap-x-2 opacity-50">
							<i className="ri-download-2-fill ri-xl"></i> PDF
						</div>
					</a>

					<a
						href="/documents/presentacion-formacion-advance-expert-program.pptx"
						target="_blank"
						rel="noreferrer"
						className={boxClassName}
						download
					>
						<div className="font-bold leading-tight">
							Presentación de Advance Expert Program
						</div>
						<div className="text-stone-600 text-xs pt-2 flex items-center justify-end gap-x-2 opacity-50">
							<i className="ri-download-2-fill ri-xl"></i> PPTX
						</div>
					</a>

					<a
						href="/documents/aep-formacion-dra_ballesteros-dr_guardiabaena.mp4"
						target="_blank"
						rel="noreferrer"
						className={boxClassName}
						download
					>
						<div className="font-bold leading-tight">
							Advance Expert Program
						</div>
						<div className="text-slate-500 text-sm leading-tight mt-1 transition-all duration-300 group-hover:text-white">
							Dra. Ballesteros - Dr. Guardabaena
						</div>
						<div className="text-stone-600 text-xs pt-2 flex items-center justify-end gap-x-2 opacity-50">
							<i className="ri-download-2-fill ri-xl"></i> MP4
						</div>
					</a>
				</div>
			</section>
		</>
	)
}
