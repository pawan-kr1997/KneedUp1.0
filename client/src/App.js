import { Route, Routes } from 'react-router';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Reset from './Pages/Reset';
import PostReset from './Pages/PostReset';
import Feeds from './Components/Feeds/Feeds';
import Bookmark from './Pages/Bookmark';
import PageNotFound from './Pages/404';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} >
        <Route path='/:category' element={<Feeds />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/bookmark' element={<Bookmark />} />
      <Route path='/reset/:resetToken' element={<Reset />} />
      <Route path='/reset' element={<PostReset />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
