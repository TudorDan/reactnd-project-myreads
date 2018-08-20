import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
	<BrowserRouter basename="/reactnd-project-myreads"><App /></BrowserRouter>, 
	document.getElementById('root')
);
