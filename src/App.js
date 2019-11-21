import React from 'react';
import './App.css';
import PassportUpload from './components/PassportUpload/PassportUpload';

function App() {
  return (
    <div className="app-content">
      <header className="App-header">
        Three Legged Dog's Passport Scanner
      </header>
      <div className='app-content'>
        <PassportUpload />
      </div>
    </div>
  );
}

export default App;
