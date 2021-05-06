/*import React from 'react';
import './App.css'
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import awsconfig from './aws-exports'

import RevolutionalApp from './components/RevolutionalApp/RevolutionalApp'

Amplify.configure(awsconfig);

const App = () => {
    const [authState, setAuthState] = React.useState()
    const [user, setUser] = React.useState()

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        })
    }, [])

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <RevolutionalApp username={user.username} />
      </div>
    ) : (
        <AmplifyAuthenticator />
  )
}

export default App;*/

import './App.css'
import { useContext, createContext, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom"
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import RevolutionalApp from './components/RevolutionalApp/RevolutionalApp'

import { Auth } from 'aws-amplify'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'

Amplify.configure(aws_exports);


// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

/*const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};*/

/*const authh = {
    isAuthenticated: false,
    signin(cb) {
        try {
            await Auth.signIn(phoneNo, password)
            authh.isAuthenticated = true
        } catch (error) {
            console.log(error)
        }
    },

    signout(cb) {
        authh.isAuthenticated = false
      //setTimeout(cb, 100);
    }
};*/

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext()

function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

function useAuth() {
    return useContext(authContext)
}

/*function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = cb => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}*/

function useProvideAuth() {
    const [user, setUser] = useState(null)
    const history = useHistory()
  
    const signin = (phoneNo, password, from) => {
        return Auth.signIn(phoneNo, password)
            .then(user => {
                setUser(user)
                history.replace(from)
            })
            .catch(error => console.log(error))
    }
  
    const signout = () => {
        return Auth.signOut()
            .then(() => {
                setUser(null)
                history.push("/")
            })
            .catch(error => console.log(error))
    }
  
    return {
        user,
        signin,
        signout
    }
}

function AuthButton() {
    //let history = useHistory();
    const auth = useAuth()

    return auth.user ? (
        <p>
        Welcome!{" "}
        <button
            onClick={() => { auth.signout() }}
        >
            Sign out
        </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function LoginPage() {
    const [phoneNo, setPhoneNo] = useState('')
    const [password, setPassword] = useState('')
    //const history = useHistory()
    const history = useHistory()
    const location = useLocation()
    const auth = useAuth();

    const { from } = location.state || { from: { pathname: "/" } }
    const signInHandler = (e) => {
        e.preventDefault()
        auth.signin(phoneNo, password, from)
    }

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>

            <div className="w3-container">
                <h2>Sign in to your account</h2>
                <form onSubmit={signInHandler}>
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
        </div>
    )
}


/*const auth = {
    isAuthenticated: false, 
    //authenticate: function() {},
    signin(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }, 
    isLoggedIn: async function () {
        try {
            await Auth.currentAuthenticatedUser()
            auth.isAuthenticated = true
            //console.log(auth.isAuthenticated)

        } catch (error) {
            auth.isAuthenticated = false
            //console.log(auth.isAuthenticated)
        }
    }
}*/

/*async function authenticatedUser() {
    let isAuthenticated = false
    try {
        const user = await Auth.currentAuthenticatedUser()
        //console.log(isLoggedIn(true))
        //isLoggedIn(true)
        isAuthenticated = true
        
    } catch (error) {
        //console.log(isLoggedIn(false))
        //isLoggedIn(false)  
    }
    return isAuthenticated
}*/

/*const authContext = createContext()

function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

function useAuth() {
    return useContext(authContext)
}

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = cb => {
        return auth.signin(() => {
            setUser("user")
            cb()
        })
    }

    const signout = cb => {
        return auth.signout(() => { 
            setUser(null)
            cb()
        })
    }

    return {
        user,
        signin,
        signout
    }
}

function AuthButton() {
    let history = useHistory()
    let auth = useAuth()

    return auth.user ? (
        <p>
            Welcome!{" "}
            <button
                onClick={() => {
                auth.signout(() => history.push("/"));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
}

function PrivateRoute({ children, ...rest }) {
    let auth = useAuth()
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            />
          )
        }
      />
    )
}

const Public = () => 'Public page'

/*function PrivateRoute ({ children, ...rest }) {
    return (
      <Route {...rest} render={({ location }) => {
        return auth.isLoggedIn === false
          ? children
          : <Redirect to={{
            pathname: '/signin',
            state: { from: location }
          }} />
      }} />
    )
}*/

/*function App() {

    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
                
                <hr />

                <Switch>
                    <Route exact path="/">
                        <Public />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <PrivateRoute path="/dashboard">
                        <RevolutionalApp />
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    )
}*/
    
export default App