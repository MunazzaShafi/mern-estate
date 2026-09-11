import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUP from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing.jsx'
import Search from './pages/Search.jsx'
export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUP/>}/>
        <Route path='/about' element={<About/>}/>
        {/* <Route path='/listings/:listingId' element={<Listing/>}/>

        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create-listings' element={<CreateListing/>}/>
          <Route
            path='/update-listings/:listingId'
            element={<UpdateListing />}
          />
        </Route> */}
       
<Route path='/search' element={<Search />} />
<Route path='/listings/:listingId' element={<Listing />} />

<Route element={<PrivateRoute />}>
  <Route path='/profile' element={<Profile />} />
  <Route path='/create-listing' element={<CreateListing />} />
  <Route path='/update-listing/:listingId' element={<UpdateListing />} />
</Route>
      </Routes>
    </BrowserRouter>
  )
}
