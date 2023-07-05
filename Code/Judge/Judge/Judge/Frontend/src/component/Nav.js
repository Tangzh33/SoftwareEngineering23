
import React, { useContext, useEffect }  from 'react';
import { Link, useHistory } from 'react-router-dom'

import {COMMUNITY_URL,COURSE_URL} from '../util/config'
import {UserContext} from '../util/UserContext'

import ailearn from '../logo(2).png'

function Nav() {

  const history = useHistory()

  const [user, setUser] = useContext(UserContext)

//  console.log('user from context', user)

  const goto = async(username) => {
    history.push(`/user/${username}`)
    // history.go(0)
  }

  return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blue-600 mb-3 shadow-xl">
            <div className="container px-4 mx-auto flex flex-wrap item-center justify-between">
                <Link to="/">
                  
                  <img className="text-4xl font-black tracking-widest text-green-100 cursor-pointer mx-72" src={ailearn} style={{height: '40px'}}></img>
                
                </Link>
                <div className="flex space-x-4 item-center justify-between">
                    <Link to="/problem"><button className="text-lg text-gray-400 cursor-pointer border-white border-2 p-2 rounded shadow-sm hover:shadow-xl active:bg-green-700 focus:bg-blue-700 focus:text-white">Problem</button></Link>
                    <box><button className="text-lg text-gray-400 cursor-pointer border-white border-2 p-2 rounded shadow-sm hover:shadow-xl focus:bg-blue-700 focus:text-white" onClick={()=>{window.open(COURSE_URL)}}>Course</button></box>
                    <box><button className="text-lg text-gray-400 cursor-pointer border-white border-2 p-2 rounded shadow-sm hover:shadow-xl focus:bg-blue-700 focus:text-white"onClick={()=>{window.open(COMMUNITY_URL)}}>Community</button></box>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
