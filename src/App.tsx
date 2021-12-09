import React from 'react';
import LayoutComponent from './components/layout';
import MainComponent from './pages/main';
import './assets/styles/style.scss';

function App() {
  return (
    <div className="App">
      <LayoutComponent>
        <MainComponent />
      </LayoutComponent>
    </div>
  );
}

export default App;
