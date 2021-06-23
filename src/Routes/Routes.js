import { Route, Switch } from 'react-router-dom'
import Dashboard from  '../components/Dashboard/Dashboard'
import Wallet from '../components/Wallet/Wallet'
import NotFound from '../components/NotFound/NotFound'
import SignIn from '../components/SignIn/SignIn'
import SignUp from '../components/SignUp/SignUp'

/*import { Auth, API, graphqlOperation } from 'aws-amplify'
import { createClient } from '../graphql/mutations'
import { onError } from '../components/libs/errorLib'*/

const Home = () => {
    {/*async function saveClient() {
        try {
            const client = {
                referalCode: 'clxr3452hs', 
                status: 'CONTRIBUTOR', 
                rule: 'RED'
            }
        
            await API.graphql(graphqlOperation(createClient, { input: client }))
    
        } catch (e) {
            onError(e)
        }
    }*/}

    return (
        <>
            {/*<button onClick={saveClient}>Save Client</button>*/}
            <h1>Home Page</h1>
        </>
    )
}

export default function Routes(){
    return (
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route exact path='/dashboard'>
                <Dashboard />
            </Route>
            <Route exact path='/signin'>
                <SignIn />
            </Route>
            <Route exact path="/signup">
                <SignUp />
            </Route>
            <Route exact path='/wallet'>
                <Wallet />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}