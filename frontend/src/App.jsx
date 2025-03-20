import { Routes, Route } from 'react-router-dom'
import '../src/styles/global.scss'
import Login from './pages/login/login.jsx'
import Cadastro from './pages/cadastro/cadastro.jsx'
import Principal from './pages/Principal/index.jsx'
import Home from './pages/principal_Interna/Home.jsx'

const Routing = () =>{
    return(
        <>
        
            <Routes>
                <Route path="/" element={<Principal/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Cadastro/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>
        
        </>
    )
}

export default Routing