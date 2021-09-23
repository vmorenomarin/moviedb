import { BrowserRouter as Router, Route } from "react-router-dom";
import { Movie } from "./components/Movie";
import { Movies } from "./components/Movies";

function App() {
  return (
    <Router>
      <div class="container">
        <Route path="/" exact component={Movies} />
        <Route path="/description/:id" component={Movie} />
      </div>
    </Router>
  );
}

export default App;
