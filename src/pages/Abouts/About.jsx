import React, { Fragment, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {counterActions} from '@stores/slices/counter.slice'
import Loading from '@components/Loadings/Loading'
import UserForm from '@components/UserForms/UserForm'
export default function About() {
  const dispatch = useDispatch();
  const counterStore = useSelector(store => store.counterStore)

  useEffect(() => {
    dispatch(counterActions.findAllUsers())
  }, [])

  // điều khiển user form
  const [showUserForm, setShowUserForm] = useState(false);
  const [dataForm, setDataForm] = useState(null);
  return (
    <div>
      {
        counterStore.loading ? <Loading/> : <></>
      }
      {
        showUserForm ? <UserForm dataForm={dataForm}></UserForm> : <></>
      }
      <h1>About Page</h1>
      <button onClick={() => {
        setShowUserForm(true)
        setDataForm({
          functionCloseForm: setShowUserForm,
          type: 'add', // loại form: add: thêm, update: cập nhật
          functionSubmit: counterActions.createNewUsers,
          preData: null
        })
      }} type="button" className="btn btn-info">Add New</button>
      <br></br>
      {
        counterStore.users.map((user) => 
          <Fragment key={user.id}>
            <div onContextMenu={(e) => {
              e.preventDefault() // hủy hành vi mặc định của chuột phải
              dispatch(counterActions.setStatusUser(
                {
                  userId: user.id,
                  patchData: {
                    block: !user.block
                  }
                }
              ))
            }} style={{textDecoration: user.block ? "line-through" : ""}}>UserName: {user.name}, UserId: {user.id}, UserEmail: {user.email}, User Phone Number: {user.phoneNumber}</div>
            <button onClick={() => {
              console.log("delete", user.id)
              dispatch(counterActions.deleteUserById(user.id))
            }} type="button" className="btn btn-danger">Delete</button>
            <button onClick={() => {
                setShowUserForm(true)
                setDataForm({
                  functionCloseForm: setShowUserForm,
                  type: 'update', // loại form: add: thêm, update: cập nhật
                  functionSubmit: counterActions.updateUser,
                  preData: user
                })
            }} type="button" className="btn btn-success">Edit</button>
          </Fragment>
        )
      }
      <br></br>
      <Outlet></Outlet>
    </div>
  )
}
