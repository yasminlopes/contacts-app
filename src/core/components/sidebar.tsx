import { Contact, Home, Info } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import Button from '../../shared/components/button';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-24 sm:w-40 bg-base-200 text-base-content flex flex-col items-center py-6 justify-between h-screen">
      <div className="flex flex-col items-center gap-4">
        <Contact  className="w-7 h-7 text-primary" />

        <span className="hidden sm:block text-sm font-semibold text-primary text-center">
          Meus
          <br />
          Contatos
        </span>

        <nav className="flex flex-col gap-2 mt-6">
          <Button
            variant={isActive('/') ? 'soft' : 'outline'}
            startIcon={<Home size={20} />}
            tooltip="Início"
            tooltipPosition="right"
            onClick={() => navigate('/')}
            size="lg"
          />
          <Button
            variant={isActive('/about') ? 'soft' : 'outline'}
            startIcon={<Info size={20} />}
            tooltip="Sobre"
            tooltipPosition="right"
            onClick={() => navigate('/about')}
            size="lg"
          />
        </nav>
      </div>

    </aside>
  );
}
