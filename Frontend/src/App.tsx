import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Owners from './routes/Owners';
import Pets from './routes/Pets';
import Appointments from './routes/Appointments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Owners />} />
          <Route path="owners" element={<Owners />} />
          <Route path="pets" element={<Pets />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 