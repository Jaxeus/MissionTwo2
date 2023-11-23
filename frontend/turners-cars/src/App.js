import "./App.css";
import TopMenu from "./pages/TopMenu";
import Header from "./pages/Header";
import MainMenu from "./pages/MainMenu";
import AzureComputerVisionApp from "./pages/Azure";

function App() {
  return (
    <div className="App">
      <TopMenu />
      <Header />
      <MainMenu />
      <AzureComputerVisionApp />
    </div>
  );
}

export default App;
