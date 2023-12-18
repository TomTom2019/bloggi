import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import { useDispatch,useSelector  } from 'react-redux';
import { isAuth } from './store/actions/users'
import { Loader } from './utils/tools';

import MainLayout from './hoc/mainLayout';
import Home from './components/home';
import Header from './components/navigation/header';
import Auth from './components/auth';


const Router = () => {
const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector(state=>state.users);

  useEffect(()=>{
    dispatch(isAuth())
  },[])

  useEffect(()=>{
    if(users.auth !== null){
      setLoading(false)
    }
  },[users])


  return(
    <BrowserRouter>
    { loading ?
          <Loader/>
      :
      <>
        <Header/>
        <MainLayout>
            <Routes>
              <Route path='/auth' element={<Auth/>}/>
              <Route path='/' element={<Home/>}/>
            </Routes>
        </MainLayout>
      </>
    }
    </BrowserRouter>
  )
}

export default Router