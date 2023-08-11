import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes/Routes';

function App() {
  return (
    <BrowserRouter basename='/'>
      <RoutesApp></RoutesApp>
    </BrowserRouter>
  );
};

export default App;