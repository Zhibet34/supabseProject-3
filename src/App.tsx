import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import Createpost from './pages/createpage'
import Homepage from './pages/homepage'
import Loginpage from './pages/loginpage'
import Registration from './pages/registrationPage'
import Navbar from './component/navbar';

function App() {

  return (
    <>
        <BrowserRouter>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/create-post" element={<Createpost />} />
              </Routes>
            </main>
        </BrowserRouter>
    </>
  )
}

export default App