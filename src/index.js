import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { takeLeading, call, select, put } from "redux-saga/effects";
import axios from "axios";
import App from "./App";

const defaultState = {
  page: 1,
  peoples: []
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_PEOPLES":
      return { ...state, peoples: action.payload };
    default:
      return state;
  }
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

function* fetchPeoples() {
  const page = yield select(state => state.page);
  const { data } = yield call(() =>
    axios(`https://swapi.co/api/people/?page=${page}`)
  );
  yield put({ type: "SET_PEOPLES", payload: data.results });
}

function* rootSaga() {
  yield takeLeading("SET_PAGE", fetchPeoples);
}
