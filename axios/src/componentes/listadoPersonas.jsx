import React from 'react';
import axios from 'axios';

/*
, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiUkZFUk5BTkRFWiIsImlhdCI6MTYwNTk4MDE0MywiZXhwIjoxNjA1OTgxMDQzfQ.b5M9HJm8rGjMog1yDoN60EYRDMXBFgsHBdTZyuVz-f8'
      }
    }
*/ 

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get("http://api.century.devitech.com.co:3000/api/persona", {headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiUkZFUk5BTkRFWiIsImlhdCI6MTYwNTk4MDE0MywiZXhwIjoxNjA1OTgxMDQzfQ.b5M9HJm8rGjMog1yDoN60EYRDMXBFgsHBdTZyuVz-f8'}})
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.nombres}</li>)}
      </ul>
    )
  }
}
