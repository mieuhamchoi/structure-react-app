import './App.scss'
import {Routes, Route} from 'react-router-dom'
import LazyLoad from './LazyLoad'
import Navbar from '@components/Navbars/Navbar'

function App() {
  return (
    <div className="App">
      <div className='app_container'>
        <Navbar></Navbar>
        {/* Content Router */}
        <Routes>
          <Route path="" element={LazyLoad(() => import("@pages/Homes/Home"))()} />
          <Route path="/about" element={LazyLoad(() => import("@pages/Abouts/About"))()}>
            {/* Router Con Của About */}
              <Route path='my-infor' element={LazyLoad(() => import("@pages/Abouts/MyInfors/MyInfor"))()}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
                           
export default App;
