import { Route, Routes } from 'react-router';
import LayoutBase from './core/layouts/base';
import Contacts from './features/contacts/view';
import About from './features/about';
import { ToastProvider } from './shared/contexts/toast';

export default function App() {
  return (
    <ToastProvider position="top-right">
      <Routes>
        <Route element={<LayoutBase />}>
          <Route path="/" element={<Contacts />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}
