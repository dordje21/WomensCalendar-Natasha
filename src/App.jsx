import { default as WebApp } from '@twa-dev/sdk'
import React, { useEffect, useState } from 'react'
import Home from '../src/components/Home/Home'
import Start from '../src/components/Start/Start'
import Preloader from './components/Preloader'


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

  useEffect(() => {
    setUser(WebApp.initDataUnsafe.user)
		setTimeout(() => {
			setLoading(false)
		}, 1000)
  }, [])
	
	if(!WebApp.isExpanded){
		WebApp.expand();
	}


	const handleShowStart = () => {
		setShowStart(false)
	}

	const customRouts = () => {
		return (
			showStart ? <Start user={user} handleShowStart={handleShowStart} /> : <Home user={user}/> 
		)
	}

  return (
		<>
		{ loading ? <Preloader/> : customRouts() }
		</>
	);
}

export default App;
