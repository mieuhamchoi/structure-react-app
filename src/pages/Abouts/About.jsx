import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {counterActions} from '@stores/slices/counter.slice'
import Loading from '@components/Loadings/Loading'

export default function About() {
  const dispatch = useDispatch();
  const counterStore = useSelector(store => store.counterStore)

  useEffect(() => {
    dispatch(counterActions.findAllUsers())
  }, [])

  useEffect(() => {
    console.log("counterStore", counterStore.users)
  }, [counterStore.users])
  return (
    <div>
      {
        counterStore.loading ? <Loading/> : <></>
      }
      <h1>About Page</h1>
      <Outlet></Outlet>
    </div>
  )
}
