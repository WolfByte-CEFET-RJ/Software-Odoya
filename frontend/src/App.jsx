import { Routes, Route } from 'react-router-dom'
import '../src/styles/global.scss'
import Login from './pages/login'

const Routing = () =>{
    return(
        <>
        
            <Routes>
                <Route path="/" element={<Login/>}/>
                
                
            </Routes>
        
        </>
    )
}

export default Routing