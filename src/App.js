import React from "react";
import './App.css';
import {useState} from "react";
import Navbar from "./components/Navbar";
import CardsListing from "./components/CardsListing";
import ContactDetails from "./components/ContactDetails";
import NewContact from "./components/NewContact";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {sampleArr} from "./sampleData";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(sampleArr);
  // const [contacts, setContacts] = useState([]);

  // Here is how you'll search and sort:
  // 1. Get data in a useEffect. You'll only do this once.
  // 2. When a search button is pressed, you will sort and update contact state.
  // 3. When a search term is changed, you'll filter but DO NOT updated contact state.

  // useEffect(() => {
  //   
  // }, []);

  function addSampleData() {
    setContacts(sampleArr);
  }

  function handleNewContactAdd(contactInfo) {
    let copy = [...contacts, contactInfo];
    setContacts(copy);
  }

  function handleSearchInputChange(e) {
    setSearchTerm(e.target.value);
  }

  function setContactState(updatedArr) {
    setContacts(updatedArr);
  }

  let filteredContacts = contacts.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar onSearchInputChange={handleSearchInputChange} />
        <Switch>
          <Route exact path="/">
            <CardsListing contacts={filteredContacts} addSampleData={addSampleData}  />
          </Route>
          <Route exact path="/details/:id">
            <ContactDetails setContactState={setContactState} contacts={filteredContacts} />
          </Route>
          <Route exact path="/newContact">
            <NewContact onNewContactAdd={handleNewContactAdd} />
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
