import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Error404 from './Error404';
import SearchResults from './SearchResults';
import Movie from './Movie';
import Person from './Person';

function RouteConfiguration() {

    return (
      <div className="page-container">
      <div className="content-wrap">
      
        <Router>
          <Routes>
            <Route path="/site_cine" element={<Home />} />
            <Route path="/site_cine/home" element={<Home />} />
            <Route path="/site_cine/*" element={<Error404 />} />
            <Route path="/site_cine/searchresults/:page" element={<SearchResults />} />
            <Route path="/site_cine/movie/:id" element={<Movie />} />
            <Route path='/site_cine/person/:personID' element={<Person />} />
          </Routes>
        </Router>
  
      </div>
      {/* <Footer /> */}
    </div>
    );
  }
  
  export default RouteConfiguration;
  