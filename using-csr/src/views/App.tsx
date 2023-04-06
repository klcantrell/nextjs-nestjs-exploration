import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import './App.css';
import Person from './Person';

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="person">
        <Route path=":id" element={<Person />} />
      </Route>
    </Routes>
  );
}
