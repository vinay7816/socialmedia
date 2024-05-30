import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Link to="/" style={{textDecoration:"none"}} className='w-100'>
              <div className='sbi'>
                <a href="#" className='nav-link text-white fs-5' aria-current="page">
                  <i className="fa-solid fa-house"></i>
                  <span className='ms-3 d-none d-md-inline'>Home</span>
                </a>
              </div>
              </Link>
              </>
  )
}

export default Home
