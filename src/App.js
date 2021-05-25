import React, {useEffect} from "react";
import './App.css';
import {useState} from "react";
import Navbar from "./components/Navbar";
import CardsListing from "./components/CardsListing";
import ContactDetails from "./components/ContactDetails";
import NewContact from "./components/NewContact";
import {BrowserRouter, Switch, Route} from "react-router-dom";

const testArr = [
  {"name": "Steve Jobs", "details": "zookeeper", id: 1},
  {"name": "Jane Jackson", "details": "lawyer", id: 2},
  {"name": "Jane", "details": "lawyer", id: 3},
  {"name": "Jane", "details": "lawyer", id: 4},
  {"name": "Jane", "details": "lawyer", id: 5},
  {"name": "Jane", "details": "lawyer", id: 6},
  {"name": "Jane", "details": "lawyer", id: 7},
  {"name": "Jane", "details": "lawyer", id: 8},
  {"name": "Jane", "details": "lawyer", id: 9},
  {"name": "Jane", "details": "lawyer", id: 10},
  {"name": "Jane", "details": "lawyer", id: 11},
  {"name": "Jane", "details": "lawyer", id: 12},
  {"name": "Jane", "details": "lawyer", id: 13},
  {"name": "Jane", "details": "lawyer", id: 14},
  {"name": "Jane", "details": "lawyer", id: 15},
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(testArr);

  // Here is how you'll search and sort:
  // 1. Get data in a useEffect. You'll only do this once.
  // 2. When a search button is pressed, you will sort and update contact state.
  // 3. When a search term is changed, you'll filter but DO NOT updated contact state.

  // useEffect(() => {
  //   fetch from the API endpoint
  // }, []);


  function handleSearchInputChange(e) {
    setSearchTerm(e.target.value);
  }

  const filteredContacts = contacts.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar onSearchInputChange={handleSearchInputChange} />
        <Switch>
          <Route exact path="/">
            <CardsListing contacts={filteredContacts}  />
          </Route>
          <Route exact path="/details/:id">
            <ContactDetails contacts={filteredContacts} />
          </Route>
          <Route exact path="/newContact">
            <NewContact />
          </Route>
          <Route>
            <h1>404 Error</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
