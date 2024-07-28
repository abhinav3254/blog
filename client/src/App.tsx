import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'primereact/button';

function App() {
  return (
    <div className="App">
      <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warning" severity="warning" />
      <Button label="Help" severity="help" />
      <Button label="Danger" severity="danger" />
    </div>
  );
}

export default App;
