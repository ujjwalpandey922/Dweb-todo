import "./App.css";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import Todo from "./components/TodoList/Todo";

function App() {
  return (
    <div className="App">
      <div className="app-side-bar">
        <SideBar />
      </div>
      <div className="app-wrapper">
        <Header />
        <Todo />
      </div>
    </div>
  );
}

export default App;
