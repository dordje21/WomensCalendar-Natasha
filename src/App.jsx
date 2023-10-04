import { default as WebApp } from '@twa-dev/sdk'
import React, { useEffect, useState } from 'react'
import Home from '../src/components/Home/Home'
import Start from '../src/components/Start/Start'

function App() {
	const [user, setUser] = useState('')
	const [showStart, setShowStart] = useState(true)

  useEffect(() => {
    setUser(WebApp.initDataUnsafe.user)
  })


	const handleShowStart = () => {
		setShowStart(false)
	}

  return (
		<>
			{ showStart ? <Start user={user} handleShowStart={handleShowStart} /> : <Home user={user}/>}
		</>
	);
}

export default App;
