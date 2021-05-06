import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const SignUp = function () {
    //const [nickName, setNickName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    async function signUp(e) { 
        e.preventDefault()
        try {
            const { user } = await Auth.signUp({
                username: phoneNo, 
                password: password,
                attributes: {
                    phone_number: phoneNo, 
                }
            })
            //console.log('✅ Sign-up Confirmed')
            history.push('/signin')
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    return (
        <div className="w3-container">
            <h2>Create a new account</h2>
            <form onSubmit={signUp}>
                <label>
                    <p>Phone Number</p>
                    <input type="text" onChange={e => setPhoneNo(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <div>
                Already have an account? <button onClick={() => history.replace('/signin')}>Sign In</button>
            </div>
        </div>
    )
}

export default SignUp