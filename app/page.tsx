'use client';

import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { Sparkles, Zap } from 'lucide-react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ReelForge
              </span>
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  {(session.user as any)?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="text-orange-400 hover:text-orange-300 transition font-semibold"
                    >
                      ⚙️ Admin
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-purple-400 transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/api/auth/signout"
                    className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
                  >
                    Sair
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => signIn()}
                    className="text-white hover:text-purple-400 transition"
                  >
                    Entrar
                  </button>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
                  >
                    Criar Conta
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Crie Vídeos de Produtos com IA
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tire uma foto, escolha o estilo e deixe a IA gerar vídeos profissionais para suas vendas no TikTok Shop
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link
                href="/dashboard"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition"
              >
                Ir para Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition"
                >
                  Começar Grátis →
                </Link>
                <button
                  onClick={() => signIn()}
                  className="px-8 py-3 rounded-lg border border-purple-400 text-purple-300 font-semibold hover:bg-purple-400/10 transition"
                >
                  Entrar
                </button>
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Sparkles className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">4+ Estilos</h3>
            <p className="text-gray-400">
              Avatar, carrossel, animação e mais. Escolha o que funciona melhor.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Zap className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Rápido</h3>
            <p className="text-gray-400">
              Foto → Estilo → Pronto em menos de um minuto.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Sparkles className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Histórico</h3>
            <p className="text-gray-400">
              Salve, organize, favoritos e tags tudo em um só lugar.
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-32 space-y-8">
          <h2 className="text-4xl font-bold text-white text-center">Planos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: 'R$29', videos: '50', styles: '2' },
              { name: 'Pro', price: '$79', videos: '100', styles: '4', popular: true },
              { name: 'Enterprise', price: '$120', videos: 'Ilimitado', styles: '∞' },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-xl border transition ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-400'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="mb-4 inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold">
                    Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-white mb-6">{plan.price}/mês</p>
                <ul className="space-y-3 mb-8 text-gray-300">
                  <li>✓ {plan.videos} vídeos/mês</li>
                  <li>✓ {plan.styles} estilos</li>
                  <li>✓ Histórico completo</li>
                  <li>✓ Favoritos e tags</li>
                </ul>
                <button className={`w-full py-2 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}>
                  Escolher
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
