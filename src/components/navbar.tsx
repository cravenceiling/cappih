'use client';

import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { redirect } from 'next/navigation';
import { signOut } from './actions';
import { Button } from './ui/button';
import { LogOut, Menu, User } from 'lucide-react';

interface NavbarProps {
  toggleSidebar?: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  async function handleSignOut() {
    const error = await signOut();

    if (error) {
      console.error(error);
      return;
    }

    redirect('/');
  }

  return (
    <nav className="w-full border-b-4 border-black px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {toggleSidebar && (
            <button onClick={toggleSidebar} className="p-2">
              <Menu size={24} />
            </button>
          )}
          <span className="font-mono text-xl font-bold">Cappih</span>
        </div>

        <div className='bg-secondary-background'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="neutral">
                <User size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-secondary-background">
              {/*
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <span>Configuraciones</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Keyboard />
                  <span>Atajos de Teclado</span>
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users />
                  <span>Grupo</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus />
                    <span>Invitar Usuarios</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail />
                        <span>Correo Electrónico</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare />
                        <span>Mensaje</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlusCircle />
                        <span>Más...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Plus />
                  <span>Nuevo Grupo</span>
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LifeBuoy />
                <span>Soporte</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              */}
              <DropdownMenuItem className='bg-secondary-background' onClick={handleSignOut}>
                <LogOut />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav >
  );
};