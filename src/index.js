import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBqlVJw398-XA06I3VwVDXUjcCVshA_DZQ",
    authDomain: "todolist-3.firebaseapp.com",
    databaseURL: "https://todolist-3.firebaseio.com",
    projectId: "todolist-3",
    storageBucket: "todolist-3.appspot.com"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
