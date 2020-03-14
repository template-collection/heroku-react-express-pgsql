import React from 'react';
import './App.css';

class App extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);

    this.state = {
      firstname: null,
      lastname: null
    }
  }

  public componentDidMount(): void {
    fetch('/api/example')
        .then(response => response.json())
        .then(data => this.setState(data))
        .catch(err => console.log(err));

    console.log("fetching...");
  }

  public render(): any {
    return [
        <h1>Hello, React</h1>,
        <p>Welcome, {this.state.firstname} {this.state.lastname}</p>
    ];
  }
}

export default App;
