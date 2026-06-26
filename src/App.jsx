import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
 
function App() {
  return ( 
    <>
      <Cursor />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
 
export default App;