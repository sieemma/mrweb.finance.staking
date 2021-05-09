import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Topbar from './components/Topbar'
import Navbar from './components/Navbar'
import Stake from './pages/Stake'
import Footer from './components/Footer'
import Home from './pages/Home'
import FAQ from './pages/FAQ'

export default function Router() {
    return (
        <BrowserRouter>
            <Topbar/>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/stake" component={Stake}/>
                <Route exact path="/faq" component={FAQ}/>
            </Switch>
            <Footer/>
        </BrowserRouter>
    )
}
