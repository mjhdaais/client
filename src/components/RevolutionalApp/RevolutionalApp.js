import './w3.css'
import './w3-theme.css'
import './RevolutionalApp.css'
import { useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, 
    Redirect
} from "react-router-dom"

import { Auth } from 'aws-amplify';

function Nav(props) {

    async function signOut() {
        try {
            await Auth.signOut({ global: true });
            console.log('✅ Sign-out successfully');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <nav className="w3-sidebar w3-bar-block w3-collapse w3-animate-left w3-card sidebar" style={props.toggle}>
            <a className="w3-bar-item w3-button w3-border-bottom w3-large w3-text-theme">{props.username}</a>
            <a className="w3-bar-item w3-button w3-hide-large w3-large" onClick={props.onClose}>Close <i className="fa fa-remove"></i></a>
            <a className="w3-bar-item w3-button">Dashboard</a>
            <a className="w3-bar-item w3-button">Edit Profile</a>
            <a className="w3-bar-item w3-button">About Us</a>
            <a className="w3-bar-item w3-button">Talk to us</a>
            <a className="w3-bar-item w3-button" onClick={signOut}>Sign Out</a>
        </nav>
    )
}

function Overlay(props) {
    return (
        <div 
            className="w3-overlay w3-hide-large w3-animate-opacity overlay" 
            onClick={props.onClose} 
            style={props.toggle}>    
        </div>
    )
}

export default function RevolutionalApp(props) {
    const [toggle, setToggle] = useState({ display: 'none' })

    const open = () => {
        setToggle({ display: 'block' })
    }

    const close =  () => {
        setToggle({ display: 'none' })
    }

    return (
        <>
            <Nav onClose={close} toggle={toggle} username={props.username}/>
            <Overlay onClose={close} toggle={toggle} />

            <div className="w3-main main">

                <div id="myTop" className="w3-container w3-top w3-theme w3-large w3-card-4">
                    <p><i className="fa fa-bars w3-button w3-teal w3-hide-large w3-xlarge" onClick={open}></i>
                    <span id="myIntro" className="w3-show-inline-block">Revolutional App</span></p>
                </div>

                <div className="w3-container content">
                    <h2>Dashboard</h2>

                    <hr />

                    <div className="w3-panel w3-light-grey w3-padding-16 w3-card w3-theme">

                        <div className="w3-row">
                            <div className="w3-half w3-container">
                                <p>Balance</p>
                                <p>N1000.00</p>
                            </div>
                            <div className="w3-half w3-container">
                                <p>Status</p>
                                <p>Not Active</p>
                            </div>
                        </div>

                        <div className="w3-row">
                            <div className="w3-half w3-container">
                                <p>Referal Link</p>
                                <p><a>https://revelutionalapp/xxxxx</a></p>
                            </div>
                            <div className="w3-half w3-container">
                                <p>Downlines</p>
                                <p>0</p>
                            </div>
                        </div>

                        <div className="w3-row">
                            <div className="w3-half w3-container">
                                <button className="w3-button w3-block w3-theme w3-card-4">Activate Account</button>
                            </div>
                            <div className="w3-half w3-container">
                                <button className="w3-button w3-block w3-theme w3-card-4">Transaction History</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}