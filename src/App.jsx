import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css"

function App() {
  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto">
      <Navbar />
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
