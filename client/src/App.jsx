import { Route, Routes , useLocation } from "react-router-dom"
import { Detail,Form,Home,Landing } from "./views"
import NavBar from "./components/NavBar/NavBar"



function App() {
  const {pathname} = useLocation()
  return (
    <>
      <div className="App">
      <div>
        {pathname !== '/' && <NavBar/>}
      </div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/create' element={<Form/>} /> 
       
      </Routes>
      </div>
    </>
  )
}

export default App
