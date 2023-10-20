import DoctorS from '../img/drs.png'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ArrowRightShort,CaretRightFill} from "react-bootstrap-icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function HomeFilm() {
  const navigate = useNavigate();
  const [filmList, setFilmList] = useState([]);
  const [text, setText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null); 
  const token = localStorage.getItem('token'); 
  


  const getUserData = async (token) => {
    try {
      if (token) {
        const response = await axios.get(
          // 'https://shy-cloud-3319.fly.dev/api/v1/auth/me', 
          `${import.meta.env.VITE_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
  
        const userData = response.data; 
        return userData;
      } else {
        return null; 
      }
    } catch (error) {
      throw error;
    }
  };
  

  const getFilm = async (query) => {
    try {
      if (token) {
        const response = await axios.get(
          // `https://shy-cloud-3319.fly.dev/api/v1/movie/popular`,
          `${import.meta.env.VITE_API_URL}/movie/popular`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        const data = response.data.data;
        setFilmList(data);

        console.log(query ? 'Search Results' : 'Film List:', data);
        console.log('Token:', token);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData(null); 
    navigate('/');
  };
  const hasToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
            const userData = await getUserData(token);
            if (userData) {
              console.log('User Data:', userData);
              setUserData(userData)
          }
        }
        
        if (text !== '') {
          const response = await axios.get(
            // `https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${text}`,
            `${import.meta.env.VITE_API_URL}/search/movie?page=1&query=${text}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          const data = response.data.data;
          setFilmList(data);

          console.log('Searcrch', data);
          console.log('Search Text:', text);
          console.log('Token:', token);

          setRefreshing(false);
        } else if (refreshing) {
          getFilm();
          setText('');
        } else {
          getFilm();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [text, refreshing, token]);
  
  

  return (
    <>
    <section  id="carousel">
        <div className="container Home mx-auto mt-4 ">
        {/* <!-- Carousel --> */}
            <div id="demo" className="carousel slide" data-bs-ride="carousel">
             {/* <!-- navbar --> */}
              <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                  <a className="navbar-brand" href="#carousel"><h1>Movielist </h1></a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="mynavbar">
                     <input className="form-control mx-auto my-custom-input" 
                      type="text"
                      placeholder="What do you want to watch?"   
                      onChange={(e) => setText(e.target.value)}
                       />
                      <form className="btn-all d-flex">
                      <button className="btn-register btn btn-danger me-2" type="button"onClick={()=> navigate('/login')}>Login</button>
                      <button className="btn-register btn btn-danger me-2" type="button" onClick={()=> navigate('/register')}>Register</button>  
                      <button  className= "btn-register btn btn-danger" type="button" onClick={handleLogout}>Log Out</button>     
                    </form>
                  </div>
                </div>
              </nav>

              {/* <!-- teks --> */}
                <div className="container">
                  <div className=" Doctor row pt-4 ">
                    <div className="colom-1 col-md-6 col-sm-12 mt-4">
                      <h1>Doctor Strange in the Multiverse of <br/> Madness </h1>
                      <p>Lorem ipsum dolor sit amet,consectetur adipisicing elit,sed do euismod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>
                    <form className="d-flex">
                      <button className="btn-trailer btn btn-danger me-2" type="button"><CaretRightFill size={20}/>WATCH TRAILER</button>
                    </form>
                  </div>
                </div>
                
            {/* <!-- Indicators/dots --> */}
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>
            {/* <!-- The slideshow/carousel --> */}
            <div className="carousel-inner pb-3 pt-3 "> 
                <div className="carousel-item active">
                <img src={DoctorS} alt="doctor-strange" className="d-block w-100" height="500px"/>
                </div>
                <div className="carousel-item">
                <img src={DoctorS} alt="doctor-strange" className="d-block w-100" height="500px" />
                </div>
                <div className="carousel-item">
                <img src={DoctorS} alt="doctor-strange" className="d-block w-100" height="500px"/>
                </div>
            </div>
            {/* <!-- Left and right controls/icons --> */}
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
            </div>
        </div>
    </section>

    <div className='container mx-auto mt-4 pb-3 pt-3'>
      <div className='all-film '>
       <div className='tittle d-flex'>
      <h2 className='h'>Popular Movie</h2>
      <h5 className='span ml-auto'>See All Movie<ArrowRightShort size={40} color='red' /></h5>
      </div>
      <div>

        {/* user */}
      {userData ? (
         <h5 className='logind'>Welcome {userData.data.name}</h5>
      ) : (
        <p className='user'>User Belum Ada</p>
      )}
      
    </div>
        <div className='listfilm'>
                  {token ? (
                    filmList.length > 0 ? (
                      filmList.map((film) => (
                        <Link to={`/movie/${film.id}`} key={film.id}>
                          <img className='img'
                            src={ `${import.meta.env.VITE_APP_BASEIMGURL_TMDB}${film.poster_path}`
                              // `https://image.tmdb.org/t/p/w500${film.poster_path}`
                            }
                            alt={film.title}
                          />
                        </Link>
                      ))
                    ) : (
                      <h5 className='logind'>Loading film data...</h5>
                    )
                  ) : (
                    <h5 className='logind'>Data Tidak Ada</h5>
                  )}
              </div>
          </div>
     </div>
  </>
  )
}

export default HomeFilm


 