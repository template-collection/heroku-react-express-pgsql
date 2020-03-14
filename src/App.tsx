import React from 'react';
import './App.css';

class App extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);

    this.state = {
      first_name: null,
      last_name: null
    }
  }

  public componentDidMount(): void {
    fetch('/api/database')
        .then(response => response.json())
        .then(data => this.setState(data))
        .catch(err => console.log(err));

    console.log("fetching...");
  }

  public render(): any {
    return [
        <h1 key={0}>Hello, React</h1>,
        <p key={1}>Welcome, {this.state.first_name} {this.state.last_name}</p>
    ];
  }
}

export default App;
