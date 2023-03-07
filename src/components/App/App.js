import React, { Component } from 'react';
import './App.css';
import { getUrls, postURL } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount = () => {
    getUrls()
      .then(data => {
        console.log(data)
        this.setState({ urls: data.urls })
      })
      .catch(error => {
        console.log(error)
      })
  }

  submitLink = (inputs) => {
    postURL(inputs)
    .then(feedback => {
      console.log(feedback)
      getUrls()
      .then(data => {
        console.log(data)
        this.setState({ urls: data.urls })
      })
      .catch(error => {
        console.log(error)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm />
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
