import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import './fontawesome';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
