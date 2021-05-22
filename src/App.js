import './App.css';
import Navbar from "./components/Navbar";
import CardsListing from "./components/CardsListing";
import ContactDetails from "./components/ContactDetails";
import {BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <CardsListing />
          </Route>
          <Route exact path="/details/:id">
            <ContactDetails />
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
