import { default as WebApp } from '@twa-dev/sdk'
import React, { useEffect, useState } from 'react'
import Home from '../src/components/Home/Home'
import Preloader from '../src/components/Preloader'
import Start from '../src/components/Start/Start'

// WebApp.CloudStorage.setItem("Test", "2");
// WebApp.CloudStorage.setItem("Test", "221");
// WebApp.CloudStorage.setItem("Testas", "1");

// WebApp.CloudStorage.getKeys();
// WebApp.CloudStorage.getItems("Test");
// WebApp.CloudStorage.getItem("Test");

function App() {
	const [user, setUser] = useState('')
	const [showStart, setShowStart] = useState(true)

	const [loading, setLoading] = useState(true)

  // useEffect(() => {
    // setUser(WebApp.initDataUnsafe.user)
		// setTimeout(() => {
		// 	setLoading(false)
		// }, 2000000)
  // }, [])

	useEffect(() => {
		const fetchData = async () => {
				try {
						const data = await asyncStorageGetItem("UserDataAnswers");
						if (data) {
							handleShowStart()
						} else {
								console.log("No data available");
						}
				} catch (error) {
						console.error('Error while retrieving/parsing data:', error);
				} finally {
					setLoading(false)
				}
		};
		setUser(WebApp.initDataUnsafe.user)
		fetchData();
}, []);
	
	if(!WebApp.isExpanded){
		WebApp.expand();
	}

	const handleReset = () => {
		console.log('reset')
		WebApp.CloudStorage.removeItem("UserDataAnswers") 
		setShowStart(true)
	}


	const handleShowStart = () => {
		setShowStart(false)
	}

	const customRouts = () => {
		return (
			showStart ? <Start user={user} handleShowStart={handleShowStart} /> : <Home user={user} handleReset={handleReset}/> 
		)
	}

  return (
		<>
		 {/* <Home user={user} handleReset={handleReset}/> */}
		{ loading ? <Preloader/> : customRouts() }
		</>
	);
}

export default App;
