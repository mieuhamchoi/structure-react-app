import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {counterActions} from '@stores/slices/counter.slice'

export default function Home() {
  const dispatch = useDispatch();
  const counterStore = useSelector(store => store.counterStore);

  useEffect(() => {
    console.log("counterStore", counterStore)
  }, [])
  return (
    <div>
      <h1>Home</h1>
      <p>Counter: {counterStore.counter}</p>
      <button onClick={() => {
        dispatch(
          counterActions.increment()
        )
      }}>Tăng Counter</button>
      <br></br>
      <button onClick={() => {
        dispatch(
          counterActions.decrement()
        )
      }}>Giảm Counter</button>
      <br></br>
      <button onClick={() => {
        dispatch(
          counterActions.resetCounter(
            {
              number: 100,
              temp: 2
            }
          )
        )
      }}>Restet Counter</button>
    </div>
  )
}
