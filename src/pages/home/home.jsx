import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home.css';

function Home() {
  return (
    <div className="div-home">
      <h1>Bienvenue sur Olympe - Votre Portail pour Tous les Événements</h1>
      <img
        className="home-image mb-3"
        src="/assets/assoc.jpg"
        alt="Association carritative"
      />
      <h2>Des événements pour tous chez Olympe !</h2>


      <p className="mt-3 mb-3">
      Bienvenue sur Olympe, la plateforme ultime pour découvrir et participer à des événements de tous genres.
      Que vous soyez un passionné de musique, un amateur de théâtre, un adepte de sport ou simplement à la recherche de nouvelles expériences, 
      Olympe est votre destination idéale pour explorer et profiter d'une multitude d'événements.
      </p>

      <div className="image-container mb-3">
        <Carousel showThumbs={false} showStatus={false} emulateTouch={true} infiniteLoop={true} autoPlay={true} interval={5000} transitionTime={1000}>
          <div>
            <img
              className="image-item"
              src="/assets/tirage.jpeg"
              alt="sport tirage"
            />
          </div>
          <div>
            <img
              className="image-item"
              src="/assets/fete.jpeg"
              alt="fête spectaculaire"
            />
          </div>
          <div>
            <img
              className="image-item"
              src="/assets/dj.webp"
              alt="fête dj soirée"
            />
          </div>
          <div>
            <img
              className="image-item"
              src="/assets/velo.jpeg"
              alt="sport vélo competitions"
            />
          </div>
        </Carousel>
      </div>

      <p className="mb-5">
      Nous croyons que chaque jour peut être une nouvelle aventure.
      C'est pourquoi nous nous efforçons de rassembler les événements les plus passionnants et diversifiés pour vous offrir des moments inoubliables.
      <br></br>Trouvez ces évenement ici:
      </p>

      <a href="/evenements" className="action-button mt-3">Commencer</a>


    </div>
  );
}

export default Home;
