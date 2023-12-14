import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './componants/Footer';
import Landingpage from './pages/Landingpage';
import Header from './componants/Header';
import Home from './pages/Home';
import Watchhistory from './pages/Watchhistory';


function App() {
  return (
    <>
    <Header/>

      <div className='container m-5'>
        <Routes>


          <Route path='/' element={<Landingpage/>} />

          <Route path='/home' element={<Home/>} />

          <Route path='/watchhistory' element={<Watchhistory/>}/>




        </Routes>
        

      </div>

      


      <Footer/>
    </>
  );
}

export default App;