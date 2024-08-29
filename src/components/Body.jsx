import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import {addUser, removeUser} from '../utils/userSlice'
import { onAuthStateChanged } from 'firebase/auth'



const Body = () => {
  const dispatch = useDispatch();
  
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/browse",
      element: <Browse/>
    }
  ]);
  
// CHANGING STATE OF THE USER STORE
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //User is Sign In
        const {uid, email, displayName} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName}));
        
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        
        // ...
      }
    });
  },[])

  return (
    <>
      <RouterProvider router={appRouter}/> 
    </>
  )
}

export default Body