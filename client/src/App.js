import "./App.css";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import CreateRecipe from "./Pages/CreateRecipe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SavedRecipes from "./Pages/SavedRecipes";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
