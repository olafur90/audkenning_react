import Audkenni from "./Components/Audkenni/Audkenni";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <div
        className="App"
        style={{ minheight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Audkenni />
        <Footer />
      </div>
      ;
    </>
  );
}

export default App;
