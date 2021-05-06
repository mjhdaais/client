const AuthFlow = function () {

    const signOut = () => {}
    const signIn = () => {}
    const verifyOtp = () => {}
    const verifyAuth = () => {}

    return (
        
        <form className="w3-container">
            <p>
                <input 
                    className="" 
                    type="text" 
                    placeholder="Phone Number (+234)"
                />
                <button 
                    className="" 
                    onClick={signIn}
                >Get OPT</button>
            </p>
            <p>
                <input 
                    className="" 
                    type="text" 
                    placeholder="Your OTP"
                />
                <button 
                    className="" 
                    onClick={verifyOtp}
                >Confirm</button>
            </p>
            <p>
                <button 
                    className="" 
                    onClick={verifyAuth}
                >Am I sign in</button>

                <button 
                    className=""
                    onClick={signOut}    
                >Sign Out</button>
            </p>
        </form>
        
    )
}

export default AuthFlow