import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useTMDBService from '../../../services/TMDBService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import {Container, Row, Col, Table} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './SinglePersonPage.scss';

const SinglePersonPage = () => {
  const {personId} = useParams();
  const [person, setPerson] = useState(null);
  const {loading, error, getPerson} =  useTMDBService();

  useEffect(() => {
      updatePerson();
  }, [personId])

  const updatePerson = () => {
      // clearError();
      getPerson(personId)
          .then(onPersonLoaded)
  } 

  const onPersonLoaded = (person) => {
      setPerson(person);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !person) ? <View person={person}/> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({person}) => {
  const {name, birthday, description, profile_path, popularity, gender} = person;
  const navigate = useNavigate();

  return (
    <div className="single-person">      
      <Container className="single-person__info-wrapp pt-5">
        <Row>
          <Col className="col-12 col-md-3 single-person__poster mb-4">
            <img className="w-100 mb-4" src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={name}/>
            <div className="single-person__details">
              <Table borderless>
                <tbody>
                  <tr>
                    <td><strong>Popularity</strong></td>
                    <td className='text-end'>{popularity}</td>
                  </tr>
                  <tr>
                    <td><strong>Birthday</strong></td>
                    <td className='text-end'>{birthday}</td>
                  </tr>
                  <tr>
                    <td><strong>Gender</strong></td>
                    <td className='text-end'>{(gender === 2) ? 'man' : 'woman'}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col className="col-12 col-md-9 col-xl-8 offset-xl-1 single-person__desc-wrapp">
            <div className='navigation mb-4'>
              <button className="single-person__back btn btn-link" onClick={() => { navigate(-1); }} ><FontAwesomeIcon icon={faArrowLeft} /> Go Back</button>
            </div>

            <div className="single-person__desc mb-5">{description}</div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SinglePersonPage;