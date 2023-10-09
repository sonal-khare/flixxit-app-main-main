import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../Components/Home'
import Dashboad from './../features/Dashboard/Dashboard';
import Signin from './../features/Signin/Signin'
import Signup from './../features/Signup/Signup'
import VideoPlayer from './../features/Dashboard/components/VideoPlayer';
import MyList from './../features/MyList/components/MyList';
import Account from '../features/Account/components/Account';
import { PlanSubscription } from '../features/Account/components/PlanSubscription';
import { Payment } from '../features/Account/components/Payment';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/account' element={<Account />}></Route>
            <Route path='/dashboard' element={<Dashboad />}></Route>
            <Route path="/video" element={<VideoPlayer />} />
            <Route path="/myList" element={<MyList />} />
            <Route path="/plansubscription" element={<PlanSubscription />} />
            <Route path="/payment" element={<Payment />} />
        </Routes>
    )
}

export default AppRoutes
