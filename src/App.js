import './App.css'
import { CreateTaskButtonClick, ClickOnEnter } from './Script.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from "react";

function App() {
  return (
    <div className="App">
        <div id={"add-task-div"}>
            <a href={"/"}><img id={"home-button"} src="./home.png" alt={""}/></a>
            <label id={"add-task-label"}>Добавить задачу:</label>
            <input type={"text"} id={"add-task-input"} onKeyDown={(e) => ClickOnEnter(e)}/>
            <img onClick={CreateTaskButtonClick} id={"add-task-button"} src={"./add.png"} alt={""}/>
        </div>

        <Router>
            <Switch>
                <Route exact path="/Home" component={App} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;