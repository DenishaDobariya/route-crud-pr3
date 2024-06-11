import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Header from './Header/Header';
import Add from './Add/Add';
import Edit from './Edit/Edit';
import View from './View/View';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App;
