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
        this.setState({ urls: [...this.state.urls, feedback] })
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
          <UrlForm submitLink={this.submitLink} />
        </header>

        <UrlContainer urls={this.state.urls} key={'urls'}/>
      </main>
    );
  }
}

export default App;
