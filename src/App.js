import React, {useEffect} from "react";
import './App.css';
import {useState} from "react";
import Navbar from "./components/Navbar";
import CardsListing from "./components/CardsListing";
import ContactDetails from "./components/ContactDetails";
import NewContact from "./components/NewContact";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {sampleArr} from "./sampleData";
import moment from 'moment';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(sampleArr);
  // const [contacts, setContacts] = useState([]);

  // Here is how you'll search and sort:
  // 1. Get data in a useEffect. You'll only do this once.
  // 2. When a search button is pressed, you will sort and update contact state.
  // 3. When a search term is changed, you'll filter but DO NOT updated contact state.

  useEffect(() => {
    sortAlphabetically();

    
  }, []);

  function sortAlphabetically() {
    let copy = [...contacts];
    copy.sort(function(a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
    setContacts(copy);
  }

  function sortByDate() {
    let copy = [...contacts];
    copy.sort(function(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return -1;
      }
    });
    setContacts(copy);
  }

  // TODO: need to finish; must compare it to current date and see which has the shortest distance
  function sortByBirthday() {
    // let copy = [...contacts];

    // let now = moment();

    // copy.sort(function(a, b) {
    //   let a_diff = now.diff(moment(a.birthday), "day");
    //   let b_diff = now.diff(moment(b.birthday), "day");
      
    //   if (a_diff > b_diff) {
    //     return -1;
    //   } else if (a_diff < b_diff) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });
    // setContacts(copy);
  }

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
            <CardsListing 
              sortByBirthday={sortByBirthday} 
              sortByDate={sortByDate} 
              sortAlphabetically={sortAlphabetically} 
              searchTerm={searchTerm} 
              contacts={filteredContacts} 
              addSampleData={addSampleData}
            />
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
