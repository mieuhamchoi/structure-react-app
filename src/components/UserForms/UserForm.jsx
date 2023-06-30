import React from 'react'
import './UserForm.scss'
import { useDispatch } from 'react-redux'
export default function UserForm(props) {
    const dispatch = useDispatch();
  return (
    <div className='userForm_container'>
        <form className='forms' onSubmit={(event) => {
            event.preventDefault(); // ngăn chặn hành vi gọi action của form

            if (event.target.userName.value == "") {
                alert("Vui lòng điền user name")
                return
            }

            let newUser = {
                name: event.target.userName.value,
                email: event.target.userEmail.value,
                phoneNumber: event.target.userPhoneNumber.value,
                block: props.dataForm.preData != null ? props.dataForm.preData.block : false
            }
            
            if (props.dataForm.type == "add") {
                dispatch(props.dataForm.functionSubmit(newUser))
            }

            if (props.dataForm.type == "update") {
                dispatch(props.dataForm.functionSubmit(
                    {
                        userId: props.dataForm.preData.id,
                        editData: newUser
                    }
                ))
            }
            
            //reset form
            event.target.userName.value = "";
            event.target.userEmail.value = "";
            event.target.userPhoneNumber.value = "";
            // props.dataForm.functionCloseForm(false);
            event.target.cancel.click();
        }}>
            {/* Input User Name */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    User Name
                    </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="userName"
                    defaultValue={props.dataForm.preData != null ?  props.dataForm.preData.name : ""}
                />
            </div>
            {/* Input User Email */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    User Email
                    </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="User Email"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="userEmail"
                    defaultValue={props.dataForm.preData != null ?  props.dataForm.preData.email : ""}
                />
            </div>
            {/* Input User Phone NUmber */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    User Phone Number
                    </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="User Phone Number"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="userPhoneNumber"
                    defaultValue={props.dataForm.preData != null ?  props.dataForm.preData.phoneNumber : ""}
                />
            </div>
            {/* Submit */}
            <button style={{marginRight: "10px"}} type="submit" className="btn btn-primary">
                {props.dataForm.type == "add" ? "Thêm Mới" : "Lưu"}
            </button>
            {/* Hủy tắt form */}
            <button onClick={() => {
                props.dataForm.functionCloseForm(false)
            }} name="cancel" type="button" className="btn btn-secondary">Hủy</button>
        </form>
    </div>
  )
}
