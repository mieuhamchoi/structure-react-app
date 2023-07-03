import React, { useEffect } from 'react'
import './Navbar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice'
export default function Navbars() {
    const dispatch = useDispatch();
    const userLoginStore = useSelector(store => store.userLoginStore);

    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
    }, [])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container_fluid">
                <a className="navbar-brand" href="#">
                    Live Plants
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link " aria-current="page" href="#">Home </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"> Plant</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Cactus</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Orchid</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Dried Bouquets</a>
                    </li>
                </ul>
            </div>
            <div className="searchBox d-flex" role="search">
                <div>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
                {
                    userLoginStore.userInfor == null ?
                        <div className='icon'>
                            <i className="icon_img fa-solid fa-user"></i>
                            <i className="icon_img fa-solid fa-cart-shopping"></i>
                        </div>
                        :
                        <div className='avatarBox'>
                            {/* <span>Xin Chào {userLoginStore.userInfor.firstName} {userLoginStore.userInfor.lastName}</span> */}
                            <img className='avatarImg' src={userLoginStore.userInfor.avatar} />
                        </div>
                }

            </div>
        </nav >
    )
}
