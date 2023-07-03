import './App.scss'
import { Routes, Route } from 'react-router-dom'
import LazyLoad from './LazyLoad'
import Navbar from '@components/Navbars/Navbar'

function App() {
  return (
    <div className="App">
      {/* Header Navbar */}
      <div className='navbar_container'>
        <div className='navbar_contents'>
          <Navbar />
        </div>
      </div>
      <div className='app_container'>
        {/* Content Router */}
        <Routes>
          <Route path="" element={LazyLoad(() => import("@pages/Homes/Home"))()} />
          <Route path="/register" element={LazyLoad(() => import("@pages/Registers/Register"))()} />
          <Route path="/login" element={LazyLoad(() => import("@pages/Logins/Login"))()} />
          <Route path="/about" element={LazyLoad(() => import("@pages/Abouts/About"))()}>
            {/* Router Con Của About */}
            <Route path='my-infor' element={LazyLoad(() => import("@pages/Abouts/MyInfors/MyInfor"))()}></Route>
          </Route>
        </Routes>
      </div>
      {/* Content Footer */}
    </div>
  );
}

export default App;
