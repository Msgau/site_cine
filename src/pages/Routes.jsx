import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Error404 from './Error404';
import SearchResults from './SearchResults';
import Movie from './Movie';

function RouteConfiguration() {

    return (
      <div className="page-container">
      <div className="content-wrap">
      
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<Error404 />} />
            <Route path="/searchresults/:page" element={<SearchResults />} />
            <Route path="/movie/:id" element={<Movie />} />
            {/* <Route path='/rooms/:id' element={<Rooms />} /> */}
          </Routes>
        </Router>
  
      </div>
      {/* <Footer /> */}
    </div>
    );
  }
  
  export default RouteConfiguration;
  