import React from 'react';
import '../styles/occasions.scss';

const Occasions = () => {

  return (
    <div className="occasionsContainer">
        <h1 className="occasionsContainer__header">Poznaj nas i odkryj najlepsze okazje!</h1>
        <div className="occasions">

          <div className="occasion">
            <div className="occasion__header ateny">
              <h1 className="occasionText">Ateny</h1>
            </div>
            <p className="occasion__description">
              Chcesz zwiedzić bajeczne Ateny? Leć z nami do pięknej Grecji!
            </p>
          </div>

          <div className="occasion">
            <div className="occasion__header budapest">
              <h1 className="occasionText">Budapeszt</h1>
            </div>
            <p className="occasion__description">
              Piękne miasto, pyszne jedzenie i wino. Tak! Leć z nami!
            </p>
          </div>

          <div className="occasion">
            <div className="occasion__header lizbona">
              <h1 className="occasionText">Lizbona</h1>
            </div>
            <p className="occasion__description">
              Półwysep Iberyjski? Czemu nie! Już teraz sprawdź okazje!
            </p>
          </div>
        </div>
    </div>
  );
}

export default Occasions;