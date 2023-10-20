
import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Notpound from "./pages/NotPound";
import PageOne from './pages/PageOne';
import Register from './pages/Register';
import Login from './pages/Login';
import DetailFilm from './components/DetailFilm.Jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";




function App() {
  return (
    <GoogleOAuthProvider clientId={
      // `383142203704-mnq6qcqitcst73pbe4jk4ls2qn358159.apps.googleusercontent.com`
      `${import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}`
      }>
    <Router>
      <Routes>
        <Route path="/"  element={< PageOne/>}/>
        <Route path="/register"  element={<Register/>}/>
        <Route path="/login"  element={< Login/>}/>
        <Route path="/movie/:id" element={<DetailFilm/>}/>
        <Route path='/*' element={<Notpound />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
