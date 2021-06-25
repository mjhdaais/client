import { Route, Switch } from 'react-router-dom'
import Dashboard from  '../components/Dashboard/Dashboard'
import NotFound from '../components/NotFound/NotFound'
import SignIn from '../components/SignIn/SignIn'
import SignUp from '../components/SignUp/SignUp'
import Landing from '../components/Landing/Landing'

export default function Routes(){
    return (
        <Switch>
            <Route exact path='/'>
                <Landing />
            </Route>
            <Route exact path='/signin'>
                <SignIn />
            </Route>
            <Route exact path="/signup">
                <SignUp />
            </Route>
            <Route exact path='/dashboard'>
                <Dashboard />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}