import React from 'react';
import './App.css';
import Router from './components/router/Router';
// import { Loader } from './components/loader/Loader';
// import Loader from 'react-loader-spinner';


class App extends React.Component {

 
  render() {
    // if (this.state.loading) {
    //   return <Loader />
    // }
    return (
      <div className='App'>
       {/* <Loader> */}
        <Router />
        {/* </Loader> */}
      </div>
    );
  }
}

export default App;
