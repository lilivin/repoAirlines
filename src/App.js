import React from 'react';
import Browser from './components/browser.js';
import Navigation from './components/navigation.js';
import Occasions from './components/occasions.js';
import Newsletter from './components/newsletter.js';
import Footer from './components/footer.js';
import './styles/app.scss';

function App() {

  return (
    <div className="App">
      <Navigation />
      <Browser />
      <Occasions />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
