import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Main from "./Main/Main";

axios.defaults.baseURL =
  "https://vozwntwomh.execute-api.us-east-2.amazonaws.com/Production/";

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
