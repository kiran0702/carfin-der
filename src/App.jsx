import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EnhancedLandingPage from './component/Herosection';
import Browsecar from './component/Browsecar';


export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnhancedLandingPage />} />
        <Route path="/Browse" element={<Browsecar />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}