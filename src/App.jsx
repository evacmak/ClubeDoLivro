import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LivrosDoMes from './pages/LivrosDoMes';
import Teapot from './pages/Teapot';
import { useContext } from 'react';
import { ThemeContext } from './context/Theme.context';
import { ChakraProvider } from '@chakra-ui/react'
import Cicatriz from './pages/Cicatriz';
import EditReview from './pages/EditReview';


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
  <Route path='/livro/:title' element={<Cicatriz />}/>
  <Route path='*' element={<Teapot />}/>
  <Route path='/review/:reviewId/edit' element={<EditReview />} />
</Routes>
</ChakraProvider>
  </div>
  );
}

export default App;
