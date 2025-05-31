'use client';

import React, { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { login } from './actions'
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction] = useActionState(login, null);

  return (
    <div className="flex justify-center md:min-h-screen md:items-center md:p-0 p-5">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center justify-center flex-col">
          <div
            className="w-32 h-32 bg-white border-4 border-black rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
          </div >
          <CardTitle className="text-2xl">
            Bienvenido de nuevo
          </CardTitle>
        </CardHeader >
        <CardContent>
          {state?.error && (
            <Alert className="mb-4">
              <AlertCircleIcon />
              <AlertDescription>Correo o contraseña incorrectos</AlertDescription>
            </Alert>
          )}
          <form
            action={formAction}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center w-full">
                  <Label htmlFor="password">
                    Contraseña
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm underline-offset-4 hover:underline whitespace-nowrap"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                type="submit"
                className="w-full"
              >
                Iniciar sesión
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full h-[2px] bg-black"></div>
          <p className="text-center mb-1">
            ¿No tienes una cuenta?{" "}
          </p>
          <Link href="/signup" className="text-blue-600 font-bold hover:underline p-0 m-0">
            Regístrate ahora
          </Link>
        </CardFooter>
      </Card >
    </div >
  );
};
