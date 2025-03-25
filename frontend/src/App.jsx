import { Routes, Route } from 'react-router-dom'
import '../src/styles/global.scss'
// import Login from './pages/login/login.jsx'
import Cadastro from './pages/cadastro/cadastro.jsx'
import Principal from './pages/Principal/index.jsx'
import Perfil from './pages/perfil/index.jsx'

const Routing = () =>{
    return(
        <>
        
            <Routes>
                {/* <Route path="/" element={<Login/>}/> */}
                <Route path="/register" element={<Cadastro/>}/>
                <Route path="/" element={<Principal/>}/>
                <Route path="/profile" element={<Perfil/>}/>
            </Routes>
        
        </>
    )
}

export default Routing