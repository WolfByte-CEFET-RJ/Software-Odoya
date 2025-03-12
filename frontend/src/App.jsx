import { Routes, Route } from 'react-router-dom'
import '../src/styles/global.scss'
import Login from './pages/login/login.jsx'
import Cadastro from './pages/cadastro/cadastro.jsx'

const Routing = () =>{
    return(
        <>
        
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Cadastro/>}/>
                
                
            </Routes>
        
        </>
    )
}

export default Routing