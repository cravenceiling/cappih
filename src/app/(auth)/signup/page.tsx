'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import Link from "next/link";
import { signup } from "../login/actions";


export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center md:min-h-screen md:items-center md:p-0 p-5">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center justify-center flex-col">
          <div
            className="w-32 h-32 bg-white border-4 border-black rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
          </div >
          <CardTitle className="text-2xl text-center">
            Crea una nueva cuenta
          </CardTitle>
        </CardHeader >
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">
                  Nombre de Usuario
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="johndoe"
                    className="pl-10 py-4 border-2 border-black focus:ring-4 focus:ring-black focus:ring-offset-2"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="relative">
                  <Label htmlFor="email">
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
                      className="pl-10 py-4 border-2 border-black focus:ring-4 focus:ring-black focus:ring-offset-2"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">
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
                    className="pl-10 py-4 border-2 border-black focus:ring-4 focus:ring-black focus:ring-offset-2"
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
              <Button
                //type="submit"
                formAction={signup}
                className="w-full"
              >
                Crear cuenta
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full h-[2px] bg-black"></div>
          <p className="text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-blue-600 font-bold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </CardFooter>
      </Card >
    </div >
  );
};
