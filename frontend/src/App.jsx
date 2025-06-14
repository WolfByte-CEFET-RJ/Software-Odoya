import { Routes, Route } from 'react-router-dom'
import '../src/styles/global.scss'
import Login from './pages/login/login.jsx'
import Cadastro from './pages/cadastro/cadastro.jsx'
import Principal from './pages/Principal/index.jsx'
import DepositoAdm from './pages/deposito_adm/index.jsx'
import Depositos from './pages/depositos/index.jsx'
import Home from './pages/principal_Interna/Home.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Perfil from './pages/perfil/index.jsx'
import RH from './pages/rh/index.jsx'

const Routing = () =>{
    return(
        <>
        
            <Routes>
                
                <Route path="/" element={<Principal/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Cadastro/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path="/profile" element={<Perfil/>}/>

                <Route path="/deposit/adm" element={<DepositoAdm/>}/>
                
                
                <Route path="/deposit" element={<Depositos/>}/>
                <Route path="/rh" element={<RH/>}/>

            </Routes>
        </>
    )
}

export default Routing