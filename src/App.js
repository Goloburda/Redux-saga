import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Form</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Form />
          </Route>
          <Route path="/list">
            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Form = connect(state => ({ page: state.page }))(({ page, dispatch }) => {
  const [currentPage, setPage] = useState(page);
  return (
    <div>
      Page:
      <input value={currentPage} onChange={e => setPage(e.target.value)} />
      <button
        onClick={() => dispatch({ type: "SET_PAGE", payload: currentPage })}
      >
        Click
      </button>
    </div>
  );
});

const List = connect(state => ({ peoples: state.peoples }))(({ peoples }) => {
  return (
    <div>
      List:
      {peoples.map(item => (
        <p key={item.name}>{item.name}</p>
      ))}
    </div>
  );
});
