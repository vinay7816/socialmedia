import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Authpage from "./Pages/Authpage/Authpage";
import Sidebar from './Components/Sidebar/Sidebar';
import Profilepage from "./Pages/Profilepage/Profilepage";
import { useSelector } from "react-redux";
import Loader from "./Components/Loader";
const Layout = ({ children }) => {
  const  user = useSelector(state => state.user.uid);
  const isLoading = useSelector(state => state.user.isLoading);
 
  return (
    <div className="container-fluid">
    <div className="row no-gutter">
       {user && <Sidebar />}
      <div className="my-2 col-lg-9 col-xl-10 col-md-8 col-sm-11 col-xs-11 d-flex offset-lg-3 offset-xl-2 offset-md-4 offset-sm-2 offset-auto ">
      {children}
          
      </div>
    </div>
  </div>
  );
};

function App() {
  document.body.style.background="black";
  const  user = useSelector(state => state.user.uid);
  return (
    <Router>
      <Routes>
        <Route
          exact path="*"
          element={
            <Layout>
              <Routes>
              <Route exact path="/" index element={user? <Homepage /> : <Navigate to='/auth' replace/> }/>
              </Routes>
            </Layout>
          }
        />
        <Route
          exact path="/:username"
          element={
            <Layout>
              <Routes>
              <Route index element={<Profilepage />} />
              </Routes>
            </Layout>
          }
        />
        <Route exact path="/auth" element={!user?<Authpage/>:<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
