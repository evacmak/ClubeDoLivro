import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LivrosDoMes from './pages/LivrosDoMes';
import Projects from './pages/Projects';
import Comunidade from './pages/Comunidade';
import Teapot from './pages/Teapot';
import ProjectDetail from './pages/ProjectDetail';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import { useContext } from 'react';
import { ThemeContext } from './context/Theme.context';
import { ChakraProvider } from '@chakra-ui/react'
import Cicatriz from './pages/Cicatriz';


function App() {

  const {theme} = useContext(ThemeContext)

  return (
  <div className={`App ${theme}`}>
  {/* Como a navbar está fora, vamos ver sempre em todas as páginas */}
    <Navbar />
    <ChakraProvider>
<Routes>
  <Route path='/' element={<Homepage />}/>
  <Route path='/livros' element={<LivrosDoMes />}/>
  <Route path='/cicatriz' element={<Cicatriz />}/>
  <Route path='/projects' element={<Projects />}/>
  <Route path='/comunidade' element={<Comunidade />}/>
  <Route path='*' element={<Teapot />}/>
  <Route path='/projects/:projectId'
          element={<ProjectDetail />}
        />
  <Route path='/projects/new' element={<AddProject />} />
  <Route path='/projects/:projectId/edit' element={<EditProject />} />
</Routes>
</ChakraProvider>
  </div>
  );
}

export default App;
