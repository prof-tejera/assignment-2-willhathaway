import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

// Define global queue in app state. The queue will be in specific order, and each item in the queue will be running, completed, or not running
// When as item is completed, the next item in the queue is set to running.
// The queue will be passed the the Homepage, and each item will be rendered there with it's given status.

import Queue from "./views/Queue";
import Docs from "./views/Docs";
import Add from "./views/Add";
import Timers from "./views/Timers";



function App() {

  let [queue, setQueue] = useState([]);

  const addToQueue = (newTimer) => {
    setQueue(prevQueue => [...prevQueue, { ...newTimer }]);
  };


  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/docs">Docs</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
            </li>
            <li>
              <Link to="/timers">Timers</Link>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Queue queue={queue} />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/add" element={<Add queue={queue} addToQueue={addToQueue} />} />
          <Route path="/timers" element={<Timers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
