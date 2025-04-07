'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import Link from "next/link";

import { login } from './actions'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <Card className="neobrutalism-card p-5 max-w-md justify-center border-4 border-black transition-all">
        <CardHeader className="space-y-2 items-center">
          <div className="w-32 h-32 bg-white border-4 border-black rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {/* <div className="text-4xl font-bold">LOGO</div> */}
          </div >
          <h1 className="text-2xl">Bienvenido de nuevo</h1>
        </CardHeader >
        <CardContent>
          <form
            //onSubmit={handleSubmit} 
            className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-bold">
                Correo electrónico
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@example.com"
                  className="pl-10 py-6 border-2 border-black focus:ring-4 focus:ring-black focus:ring-offset-2"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-bold">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 py-6 border-2 border-black focus:ring-4 focus:ring-black focus:ring-offset-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-blue-600 font-bold hover:underline transition-all">
                ¿Olvidaste la contraseña?
              </a>
            </div>
            <Button
              //type="submit"
              formAction={login}
              className="w-full py-6 text-base font-bold bg-[#ffde59] text-black border-2 border-black hover:bg-[#ffcb29] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full h-[2px] bg-black"></div>
          <p className="text-center">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-blue-600 font-bold hover:underline">
              Regístrate ahora
            </Link>
          </p>
        </CardFooter>
      </Card >
    </div>
  );
};
