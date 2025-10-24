import React from 'react';
import { Container } from 'react-bootstrap';
import ppDede from '../assets/pp-dede.png';
import ppHaikal from '../assets/pp-haikal.png';
import ppIsmi from '../assets/pp-ismi.png';
import ppJajng from '../assets/pp-jajng.png';

const team = [
  {
    name: 'Dede Arif Gunawan',
    role: 'IT SUPPORT',
    avatar: ppDede,
    email: 'dedearifgunawan@gmail.com',
    phone: '+6285288010801',
  },
  {
    name: 'Haikal Subianto',
    role: 'MARKETING',
    avatar: ppHaikal,
    email: 'dedearifgunawan@gmail.com',
    phone: '+6285288010801',
  },
  {
    name: 'Ismi Aulia',
    role: 'MARKETING',
    avatar: ppIsmi,
    email: 'dedearifgunawan@gmail.com',
    phone: '+6285288010801',
  },
  {
    name: 'Jajang Pratama',
    role: 'PROGRAMER',
    avatar: ppJajng,
    email: 'dedearifgunawan@gmail.com',
    phone: '+6285288010801',
  },
];

const MarketingTeam = () => {
  return (
    <Container className="marketing-section">
      <div className="marketing-grid">
        {team.map((m) => (
          <div className="marketing-card" key={m.name}>
            <div className="marketing-card__body">
              <img className="marketing-avatar" src={m.avatar} alt={m.name} />
              <h2 className="marketing-name">{m.name}</h2>
              <p className="marketing-badge">{m.role}</p>
            </div>
            <div className="marketing-card__actions">
              <a href={`mailto:${m.email}`} className="marketing-action" aria-label="Send Email">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 2.5c0-.825-.675-1.5-1.5-1.5H3c-.825 0-1.5.675-1.5 1.5m15 0v9c0 .825-.675 1.5-1.5 1.5H3c-.825 0-1.5-.675-1.5-1.5v-9m15 0L9 7.75 1.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Send Email</span>
              </a>
              <a href={`tel:${m.phone}`} className="marketing-action marketing-action--right" aria-label="Call Now">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.29 3.75a3.75 3.75 0 0 1 2.962 2.963M11.289.75a6.75 6.75 0 0 1 5.963 5.955m-.75 5.985v2.25a1.5 1.5 0 0 1-1.635 1.5 14.84 14.84 0 0 1-6.472-2.303 14.6 14.6 0 0 1-4.5-4.5 14.84 14.84 0 0 1-2.303-6.502A1.5 1.5 0 0 1 3.085 1.5h2.25a1.5 1.5 0 0 1 1.5 1.29 9.6 9.6 0 0 0 .525 2.108 1.5 1.5 0 0 1-.338 1.582l-.952.952a12 12 0 0 0 4.5 4.5l.952-.952a1.5 1.5 0 0 1 1.582-.338c.681.254 1.388.43 2.108.526a1.5 1.5 0 0 1 1.29 1.522" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Call Now</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default MarketingTeam;