import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Plus, Edit, Trash2, Tags, ListFilter } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  // Get the current user to determine authentication status
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="w-full border-b-2 border-black px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold text-[#3F3917]">Cappih</span>
          </div>
          <div className="flex gap-2 md:gap-4">
            {isLoggedIn ? (
              <Button size="sm" className="md:size-default" asChild>
                <Link href="/dashboard">Ir al panel de control</Link>
              </Button>
            ) : (
              <>
                <Button variant="neutral" size="sm" className="md:size-default" asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button size="sm" className="md:size-default" asChild>
                  <Link href="/signup">Registrarse</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3F3917] pr-2">Finanzas simplificadas con <span className="text-[#3F3917]">Cappih</span></h1>
              <p className="text-xl mb-8">Gestiona tus gastos de forma rápida y sencilla. Sin complicaciones, sin funciones innecesarias.</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
                    {isLoggedIn ? "Ir al panel" : "Comenzar"} <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] border-2 border-black rounded-base shadow-shadow bg-yellow-100">
              <img 
                src="/placeholder-dashboard.png" 
                alt="Vista previa del panel de Cappih" 
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-secondary-background border-y-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Simple pero Poderoso</h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto">Diseñado para ser minimalista y directo al grano con solo las funciones que realmente necesitas.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="mb-2">
                  <Plus size={40} />
                </div>
                <CardTitle>Gestión de Transacciones</CardTitle>
                <CardDescription>Crea, modifica y elimina tus transacciones con facilidad.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Con una interfaz limpia y sencilla, registra tus gastos e ingresos en segundos. Edita o elimina cuando lo necesites, todo en un solo lugar.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2">
                  <Tags size={40} />
                </div>
                <CardTitle>Categorías Personalizadas</CardTitle>
                <CardDescription>Organiza tus finanzas a tu manera con categorías personalizadas.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Crea y asigna categorías a tus transacciones para visualizar mejor en qué estás gastando tu dinero y cómo puedes ajustar tus hábitos.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simplicity Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Diseño Minimalista</h2>
              <p className="text-lg mb-4">Sin distracciones, sin funciones complicadas. Solo lo esencial para que puedas tomar el control de tus finanzas rápidamente.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-blue-600"><ListFilter size={20} /></div>
                  <p>Interfaz limpia y fácil de entender</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-blue-600"><Edit size={20} /></div>
                  <p>Edición rápida sin pasos innecesarios</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-blue-600"><Trash2 size={20} /></div>
                  <p>Elimina registros sin complicaciones</p>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 rounded-base border-2 border-black shadow-shadow p-4 bg-blue-50">
              <div className="aspect-square relative">
                <img 
                  src="/placeholder-interface.png" 
                  alt="Interfaz minimalista de Cappih" 
                  className="object-contain" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-secondary-background border-y-2 border-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comienza a organizar tus finanzas hoy</h2>
          <p className="text-xl mb-8">Cappih te ofrece solo lo que necesitas, sin complicaciones. Tu viaje hacia una mejor gestión financiera empieza aquí.</p>
          <Button size="lg" asChild>
            <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
              {isLoggedIn ? "Ir al panel de control" : "Crear Cuenta Gratuita"} <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
