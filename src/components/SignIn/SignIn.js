import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
//import PropTypes from 'prop-types'
import { Auth } from 'aws-amplify'

export default function SignIn() {
    const [phoneNo, setPhoneNo] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    //const [
    //    redirectToReferrer,
    //    setRedirectToReferrer] = useState(false)
    //const { state } = useLocation()



    async function signIn(e) {
        e.preventDefault()
        try {
            const user = await Auth.signIn(phoneNo, password)
            //console.log('✅ Sign-in successfully', user)
            history.push('/dashboard')
            //setRedirectToReferrer(true)
        } catch (error) {
            console.log('error signing in', error)
            //setRedirectToReferrer(false)
        }
    }

    //if (redirectToReferrer === true) {
    //    return <Redirect to={state?.from || '/protected'} />
    //}

    return(
        <div className="w3-container">
            <h2>Sign in to your account</h2>
            <form onSubmit={signIn}>
                <label>
                    <p>Phone Number</p>
                    <input type="text" onChange={e => setPhoneNo(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
            <div>
                Don't have an account? <button onClick={() => history.replace('/signup')}>Sign Up</button>
            </div>
        </div>
    )
}

//SignIn.propTypes = {
//  setToken: PropTypes.func.isRequired
//};