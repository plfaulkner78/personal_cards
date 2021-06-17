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
  // TODO: make sure below defaults to empty
  // const [contacts, setContacts] = useState(sampleArr);
  const [contacts, setContacts] = useState([]);

  // Here is how you'll search and sort:
  // 1. Sort data initially in a useEffect. (normally you'd read from a database at this point)
  // 2. When a search button is pressed, you will sort and update contact state.
  // 3. When a search term is changed, you'll filter but DO NOT updated contact state.

  useEffect(() => {
    if (contacts.length) {
      sortAlphabetically();
    }
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

  // These must be zero-indexed to work properly with moment in the function below.
  const month_to_index = {
    "January": 0,
    "February": 1,
    "March": 2,
    "April": 3,
    "May": 4,
    "June": 5,
    "July": 6,
    "August": 7,
    "September": 8,
    "October": 9,
    "November": 10,
    "December": 11
  };
  
  function month_date_diff(compareMonth, compareDate) {
    // Function returns the difference in milliseconds between two dates.
    // This is used in the sorting function to determine which dates are 
    // closest to the current date.

    let now = moment();

    // Get current month, date, and year as ints
    let [currentMonth, currentDate, currentYear] = [now.month(), now.date(), now.year()];

    if (compareMonth < currentMonth) {
      // If the month has already passed this year, compare today to next year's birthday
      let nextBirthday = moment([currentYear + 1, compareMonth, compareDate]);
      return nextBirthday.diff(now);
    } else if (compareMonth === currentMonth) {
      // If today's month and the birthday month are the same...
      if (compareDate > currentDate) {
        // Birthday is this month, but hasn't happened yet
        let nextBirthday = moment([currentYear, compareMonth, compareDate]);
        return nextBirthday.diff(now);
      } else if (compareDate < currentDate) {
        // Birthday was this month, but already passed
        let nextBirthday = moment([currentYear + 1, compareMonth, compareDate]);
        return nextBirthday.diff(now);
      } else {
        // If the dates and months are equal, then today is the birthday!
        return 0;
      }
    } else {
      // compareMonth > currentMonth, so the birthday month hasn't happened yet this year.
      let nextBirthday = moment([currentYear, compareMonth, compareDate]);
      return nextBirthday.diff(now);
    }
  }

  function sortByBirthday() {
    let copy = [...contacts];

    copy.sort(function(a, b) {
      let a_diff = month_date_diff(month_to_index[a.birthMonth], a.birthDate);
      let b_diff = month_date_diff(month_to_index[b.birthMonth], b.birthDate);
      
      if (a_diff <= b_diff) {
        return -1;
      } else {
        return 1;
      }
    });

    setContacts(copy);
  }

  function addSampleData() {
    // Sort the sample data alphabetically before you add it to state.
    sampleArr.sort(function(a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
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
