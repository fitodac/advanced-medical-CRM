// import { createContext, useContext } from 'react'
import { Outlet, useNavigation, useLocation } from 'react-router-dom'
import { AppProvider } from './context'

import { useAuth } from './hooks'
import { API_URI } from './config'
import {
	Loading,
	Navbar,
	Header,
	Footer
} from './components'


// export const appContext = createContext({})

function App() {

	const navigation = useNavigation()
	const { user } = useAuth()
	const { token_type, token } = user
	const location = useLocation()


	const contextValue = {
		API_URI,
		user,
		token: `${token_type} ${token}`,
	}

  return (
		<AppProvider>
			{ navigation.state === 'loading' && (<Loading />) }


			{ navigation.state === 'idle' && (
			<div className="grid grid-cols-12">
				<div 
					className="bg-teal w-screen min-h-screen -left-full fixed 
											sm:w-auto sm:relative sm:left-auto sm:col-span-3 
											lg:col-span-2">
					<Navbar />
				</div>

				<section 
					className="col-span-12 w-full min-h-screen overflow-hidden 
										sm:col-span-9 lg:col-span-10">

					<div className="max-w-full">
						<div className="grid max-w-full">
							<Header />
							
							<div className="row-span-2 px-6 py-5 overflow-x-auto">
								<Outlet />
							</div>

							{!location.pathname.includes('/crd/') && (<Footer />)}
						</div>
					</div>

				</section>
			</div>
			)}
			
		</AppProvider>
  )
}


// export const useAppContext = () => useContext(appContext)

export default App
