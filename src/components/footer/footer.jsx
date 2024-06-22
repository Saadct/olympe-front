import React from 'react';
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer mt-4">
      <div className="footer-container">
        <div className="footer-links">
          <a href="/conditions-utilisation">Conditions Générales d'Utilisation</a>
        </div>
        <div className="footer-contact">
          <p>Contactez-nous : <a href="mailto:contact@votresite.com">contact@votresite.com</a></p>
          <p>Adresse : 123 Rue Principale, Ville, Pays</p>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} [Olympe]. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
