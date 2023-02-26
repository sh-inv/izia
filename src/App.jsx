import GlobalStyle from '../GlobalStyle';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </>
  );
};

export default App;
