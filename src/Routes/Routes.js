import { Route, Switch } from 'react-router-dom'
import Dashboard from  '../components/Dashboard/Dashboard'
import Wallet from '../components/Wallet/Wallet'
import NotFound from '../components/NotFound/NotFound'
import SignIn from '../components/SignIn/SignIn'
import SignUp from '../components/SignUp/SignUp'

const Home = () => 'Home Page'

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