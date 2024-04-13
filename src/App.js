
import './App.css';
import Post from "./Post";
import Sidenav from './Sidenav';

function App() {
  return (
    <div className="App">
       <h1>Simple Instagram-Clone</h1>
       <Sidenav />
      <Post/>
      {/* <New /> */}
      {/* <Example /> */}
    </div>
  );
}

export default App;
