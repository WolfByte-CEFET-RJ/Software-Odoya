import { Routes, Route } from 'react-router-dom'
import '../src/styles/global.scss'
import Login from './pages/login/login.jsx'
import Cadastro from './pages/cadastro/cadastro.jsx'
import Principal from './pages/Principal/index.jsx'
import Perfil from './pages/perfil/index.jsx'
import RH from './pages/rh/index.jsx'

const Routing = () =>{
    return(
        <>
        
            <Routes>
                <Route path="/" element={<Principal/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Cadastro/>}/>
                <Route path="/profile" element={<Perfil/>}/>
                <Route path="/rh" element={<RH/>}/>
            </Routes>
        
        </>
    )
}

export default Routing