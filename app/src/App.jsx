import { createContext, useContext } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'

import { useAuth } from './hooks'
import { API_URI } from './config.dev'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'


export const appContext = createContext({})

function App() {

	const navigation = useNavigation()
	const { user } = useAuth()
	const { token_type, token } = user

	const contextValue = {
		API_URI,
		user,
		token: `${token_type} ${token}`
	}

  return (
		<appContext.Provider value={contextValue}>
			{ navigation.state === 'loading' && (<div className="w-screen h-screen grid place-content-center">
				<div className="spinner w-20"></div>
			</div>) }


			{ navigation.state === 'idle' 
			&& (<div className="grid grid-cols-12">
						<div 
							className="bg-slate-100 w-screen min-h-screen -left-full fixed 
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

									<Footer />
								</div>
							</div>

						</section>

					</div>) }
			
		</appContext.Provider>
  )
}


export const useAppContext = () => useContext(appContext)

export default App
