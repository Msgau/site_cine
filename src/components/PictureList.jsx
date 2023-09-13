import { Link } from 'react-router-dom';
import '../styles/pictureList.css';
import defaultImageURL from '../assets/image-non-disponible.png';

const PictureList = ({ componentTitle, objects, statut, imagePathKey }) => {
  return (
    <div className='component'>
      <h3>{componentTitle}</h3>
      <ul className='component-list'>
        {objects.map(object => (
          <li key={object.id} className='component-item'>
            <Link to={`/site_cine/${statut}/${object.id}`}>
              <div className='component-image' title={statut === 'movie' ? object.title : object.name}>
                <img
                  src={object[imagePathKey] ? `https://image.tmdb.org/t/p/w200${object[imagePathKey]}` : defaultImageURL}
                  alt={statut === 'movie' ? object.title : object.name}
                />
              </div>
              <figcaption title={statut === 'movie' ? object.title : object.name}>{statut === 'movie' ? object.title : object.name}</figcaption>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PictureList;
