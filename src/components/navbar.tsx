'use client';

import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { redirect } from 'next/navigation';
import { signOut } from './actions';
import { Button } from './ui/button';
import { LogOut, Menu } from 'lucide-react';

export default function Navbar() {
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
          <span className="font-mono text-xl font-bold">Cappih</span>
        </div>

        <div className='bg-secondary-background'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild type='button'>
              <Button variant="neutral" className="p-2" >
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-secondary-background">
              <DropdownMenuItem
                className='bg-secondary-background'
                onClick={handleSignOut}
              >
                <LogOut size={24} />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav >
  );
};
