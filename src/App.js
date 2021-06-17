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

  const month_to_index = {
    "January": 0,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
  };
  
  function month_date_diff(compareMonth, compareDate) {
    // Function returns the difference in milliseconds between two dates.
    // This is used in the sorting function to determine which dates are 
    // closest to the current date.

    let now = moment();

    // Get current month, date, and year as ints
    let [currentMonth, currentDate, currentYear] = now.format("M D YYYY").split(" ").map(num => parseInt(num));

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
      // The birthday month hasn't happened yet this year, so the birthday hasn't happened
      let nextBirthday = moment([currentYear, compareMonth, compareDate]);
      return nextBirthday.diff(now);
    }
  }

  function sortByBirthday() {
    let copy = [...contacts];

    copy.sort(function(a, b) {
      let a_diff = month_date_diff(month_to_index[a.birthMonth], a.birthDate);
      let b_diff = month_date_diff(month_to_index[b.birthMonth], b.birthDate);
      
      if (a_diff < b_diff) {
        return -1;
      } else if (a_diff > b_diff) {
        return 1;
      } else {
        return 0;
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
