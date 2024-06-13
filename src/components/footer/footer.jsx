import React from 'react';
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="/terms-of-service">Conditions Générales d'Utilisation</a>
          <a href="/privacy-policy">Politique de Confidentialité</a>
          <a href="/legal-notice">Mentions Légales</a>
        </div>
        <div className="footer-contact">
          <p>Contactez-nous : <a href="mailto:contact@votresite.com">contact@votresite.com</a></p>
          {/* Adresse postale facultative */}
          <p>Adresse : 123 Rue Principale, Ville, Pays</p>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com/votresite" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com/votresite" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com/votresite" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} [Nom de votre entreprise]. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
