import './App.css'
import { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import Routes from './Routes/Routes'
import { AppContext } from "./components/libs/contextLib"

import { makeStyles } from '@material-ui/core/styles';
///import Link from '@material-ui/core/Link';
//import { Link } from 'react-router-dom'

import { Auth } from "aws-amplify"

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { Typography } from '@material-ui/core';
//import classes from '*.module.css';

Amplify.configure(awsconfig);

//Temporary Component
const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex', 
        justifyContent: 'space-between',
        background: '#999',
        fontSize: '2em', 
        padding: '0.5em', 
    },

    nestedLink: {
        fontSize: '1em', 
        display: 'flex', 
    }
}))

function ButtonLink() {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
        <Typography variant='inherit'>
            Revolutional App
        </Typography>

        <div className={classes.nestedLink}>
            <Link to='/wallet'>
                Wallet
            </Link>
            <Link to='/signup'>
                Sign Up
            </Link>
            <Link to='/signin'>
                Sign In
            </Link>
        </div>
    </div>

  );
}

function App() {
    const history = useHistory()
    const [isAuthenticated, userHasAuthenticated] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(true)
  
    useEffect(() => {
        onload()
    }, [])

    async function onload() {
        try {
            await Auth.currentSession()
            userHasAuthenticated(true)

        } catch(e) {
            if (e !== 'No current user') {
                alert(e)
            }

        }
        setIsAuthenticating(false)
    }

    async function handleSignOut() {
        await Auth.signOut()

        userHasAuthenticated(false)

        history.push("/signin")
    }

    return (
        !isAuthenticating && (
            <>
                {isAuthenticated ? (
                    <Link to='#' onClick={handleSignOut}>Sign Out</Link>
                ) : (
                    <ButtonLink />
                )}
                <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                    <Routes />
                </AppContext.Provider>
            </>
        )
    )
}
    
export default App