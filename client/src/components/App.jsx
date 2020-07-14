import React, { Component } from "react";
import api from "../services/api";

// const App = () => <div>App works</div>;

class App extends Component {
  async componentDidMount() {
    const response = await api.call("post", "auth/login", {
      username: "username",
      password: "password",
    });
    console.log(response);
  }

  render() {
    return <div>App Works</div>;
  }
}

export default App;
