// Import necessary libraries and components
import {default as WebApp} from '@twa-dev/sdk'
import React, {useEffect, useState} from 'react'
import Home from '../src/components/Home/Home'
import Preloader from '../src/components/Preloader'
import Start from '../src/components/Start/Start'
import asyncStorageGetItem from '../src/hooks/asyncStorageGetItem'

// Define constant for the URL of the advice API
const apiAdvice = 'https://api.adviceslip.com/advice'

// Main function component for the app
function App() {
    // Initialize the state variables
    const [showStart, setShowStart] = useState(true);
    const [loading, setLoading] = useState(true);
    const [advice, setAdvice] = useState('');

    // Use useEffect hook to fetch data when the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Await the data fetching from the async storage with key "UserDataAnswers"
                const data = await asyncStorageGetItem("UserDataAnswers");
                if (data) {
                    // If data is present, hide the start component
                    handleShowStart()
                } else {
                    // If no data is present, log the info
                    console.log("No data available");
                }
            } catch (error) {
                // Log any errors while fetching and parsing data
                console.error('Error while retrieving/parsing data:', error);
            } finally {
                // Delay toggling loading to false by 2 seconds
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            }
        };
        // Invoke the async function to fetch data
        fetchData();

        try {
            // Fetch advice from the advice API and set the state accordingly
            fetch(apiAdvice)
                .then(response => response.json())
                .then(data => setAdvice(data.slip.advice))
                .catch(err => console.error(err));
        } catch (err) {
            console(err)
        }

    }, []);

    // Check if the web app is expanded, and if not, expand it
    if (!WebApp.isExpanded) {
        WebApp.expand();
    }

    // Function to reset the data in the cloud storage and show the start component
    const handleReset = () => {
        console.log('reset')
        WebApp.CloudStorage.removeItem("UserDataAnswers")
        setShowStart(true)
    }

    // Function to hide the start component
    const handleShowStart = () => {
        setShowStart(false)
    }

    // Function to render the custom routes based on the showStart state
    const customRouts = () => {
        return (
            showStart ? <Start handleShowStart={handleShowStart}/> : <Home handleReset={handleReset} advice={advice}/>
        )
    }

    // Render the components conditionally based on the loading and showStart state
    return (
        <>
            {loading ? <Preloader/> : customRouts()}
        </>
    );
}

export default App;
