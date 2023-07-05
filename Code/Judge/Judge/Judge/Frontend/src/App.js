import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom'

import Nav from './component/Nav'

import Main from './page/Main'
import NF from './page/NF'
import Problem from './page/Problem';
import Submit from './page/Submit';
import ShowProblem from './page/ShowProblem';

import {BACKEND_URL} from './util/config'
import {UserContext} from './util/UserContext'

import ReactLoading from 'react-loading';
// import queryString from 'query-string'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{

    (async()=>{
      //console.log(`${BACKEND_URL}/user`)
      try{
        if(!user) {
          const response = await fetch( `${BACKEND_URL}/user`, {
          credentials: 'include',
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json'
          },
        })
        const data = await response.json()
        //console.log(data)
        if(data.success === "yes") {
          setUser(data.data)
          //console.log(user)
        } else {
          setUser(null)
        }
      }

        setLoading(false)
      } catch(err) {
        setLoading(false)
      }
    })()

    // console.log(user)

  },[])
  


  return (
    <UserContext.Provider value={[user, setUser]}>
      { loading && <div className="flex flex-wrap container mx-auto">
            <ReactLoading type={"bars"} color={"#2563EB"} height={667} width={375} className="mx-auto"/>
            </div>
      }
      { !loading && <div className="flex flex-col h-screen" style={{paddingBottom:'60px', position: 'relative'}}>
        <Router>
          <Nav/>
          <div className="min-h-screen">
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route exact path="/problem" component={Problem}/>
              <Route exact path="/submit" component={Submit}/>
              <Route exact path="/submit/:title" component={Submit}/>
              <Route exact path="/problem/:title" component={ShowProblem}/>
              <Route component={NF}/>
            </Switch>
          </div>
        </Router>
      </div>}
    </UserContext.Provider>
  );
}

export default App;
