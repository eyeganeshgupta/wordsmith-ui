import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const HomePage = () => {
    return (
      <h1 className="px-4 text-2xl font-bold underline">
        Welcome to Wordsmith
      </h1>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
