
import React from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = React.useState(false);
  const { toast } = useToast();

  const toggleDarkMode = () => {
    // Toggle dark mode
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');

    toast({
      title: darkMode ? "Modo claro activado" : "Modo oscuro activado",
      duration: 2000,
    });
  };

  return (
    <header className="w-full border-b-2 border-black px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {toggleSidebar && (
            <button onClick={toggleSidebar} className="p-2">
              <Menu size={24} />
            </button>
          )}
          <span className="font-mono text-xl font-bold">Cappih</span>
        </div>

        <button
          onClick={toggleDarkMode}
          className="neobrutalism-button p-2"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
