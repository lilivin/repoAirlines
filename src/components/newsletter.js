import React from 'react';
import '../styles/newsletter.scss';

const Newsletter = () => {

  return (
    <div className="newsletter">
        <h1 className="newsletter__header">Najlepsze okazje! Nawet 40% zniżki!</h1>
        <p className="newsletter__info">Wyjątkowe oferty przygotowujemy tylko dla wybranych podróżników.Zostań jednym z nich.</p>
        <div className="newsletter__form">
          <input type="text" placeholder="Wpisz adres email..." className="input"></input>
          <button className="button">Zapisz się</button>
        </div>
    </div>
  );
}

export default Newsletter;