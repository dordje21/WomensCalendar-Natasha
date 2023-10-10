import { default as WebApp } from '@twa-dev/sdk'
import React, { useEffect, useState } from 'react'
import Home from '../src/components/Home/Home'
import Preloader from '../src/components/Preloader'
import Start from '../src/components/Start/Start'
import asyncStorageGetItem from '../src/hooks/asyncStorageGetItem'

function App() {
	const [user, setUser] = useState('')
	const [showStart, setShowStart] = useState(true)
	const [loading, setLoading] = useState(true)
	const [advice, setAdvice] = useState('');

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
						setTimeout(() => {
							setLoading(false)
						}, 2000)
				}
		};
		setUser(WebApp.initDataUnsafe.user)
		fetchData();

		fetch('https://api.adviceslip.com/advice')
			.then(response => response.json())
			.then(data => setAdvice(data.slip.advice))
			.catch(err => console.error(err));
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
			showStart ? <Start user={user} handleShowStart={handleShowStart} /> : <Home user={user} handleReset={handleReset} advice={advice} /> 
		)
	}

  return (
		<>
		{ loading ? <Preloader/> : customRouts() }
		</>
	);
}

export default App;
