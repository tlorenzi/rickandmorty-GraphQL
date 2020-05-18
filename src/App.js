import React from 'react';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import Character from "./Character";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { charArr: [], count: 0 };

  }

  getMore = () => {

    const GET_ALL_CHARACTERS = gql`
      query try ($pageNumber: Int!)
      {
        characters(page: $pageNumber)  
        {
          results
          {
            name,
            status,
            species,
            gender,
            image,
            episode
            {
              name
            }
          }
        }
      }
      
      `;

    let characterResults = [...this.state.charArr];
    let httpLink = createHttpLink({ uri: 'https://rickandmortyapi.com/graphql/' });

    const client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache()
    });

    client.query({ query: GET_ALL_CHARACTERS, variables: { "pageNumber": this.state.count + 1 } })
      .then((res) => {
        let tempRes = res.data.characters.results;

        for (let i = 0; i < tempRes.length; i++) {
          let obj = tempRes[i];
          let temp = {};

          for (let prop in obj) {
            temp[prop] = obj[prop];

            if (prop.toString() === "episode") {
              temp.episode = obj.episode.length;
            }
          }
          characterResults.push(temp);
        }

        this.setState({ charArr: characterResults, count: this.state.count + 1 });
      })
      .catch(err => console.log(err));
  }

  pagnate = () => {
    console.log("Pagnate");
    this.getMore();
  }

  UNSAFE_componentWillMount() {
    this.getMore();
  }

  render() {
    return (
      <div>
        <div className="appClass">
          {this.state.charArr.map(curr =>
            <Character name={curr.name} status={curr.status} episode={curr.episode} species={curr.species} gender={curr.gender} image={curr.image} key={curr.name} />
          )}
        </div>
        <div id="buttonDiv">
          <button id="button" onClick={this.pagnate}>More</button>
        </div>
      </div>
    )
  }
}

export default App;
