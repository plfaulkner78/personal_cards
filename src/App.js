import './App.css';
import {useState} from "react";
import Navbar from "./components/Navbar";
import CardsListing from "./components/CardsListing";
import ContactDetails from "./components/ContactDetails";
import {BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  const [searchByName, setSearchByName] = useState('');

  function handleSearchInputChange(e) {
    setSearchByName(e.target.value);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar onSearchInputChange={handleSearchInputChange} />
        <Switch>
          <Route exact path="/">
            <CardsListing />
          </Route>
          <Route exact path="/details/:id">
            <ContactDetails />
          </Route>
          <Route exact path="/newContact">
            <h1>Add a new contact</h1>
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
