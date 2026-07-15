'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BarChart3, Users, Video, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // Check if user is admin by role
    const userRole = (session.user as any)?.role;
    if (userRole === 'admin') {
      setIsAdmin(true);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  }, [session, status, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Settings className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ReelForge Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">{session?.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <div className="flex items-center gap-4">
              <Users className="w-10 h-10 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Usuários Totais</p>
                <p className="text-3xl font-bold text-white">2</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <div className="flex items-center gap-4">
              <Video className="w-10 h-10 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Vídeos Gerados</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <div className="flex items-center gap-4">
              <BarChart3 className="w-10 h-10 text-pink-400" />
              <div>
                <p className="text-gray-400 text-sm">Receita (Mês)</p>
                <p className="text-3xl font-bold text-white">R$ 0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Users Management */}
          <div className="p-8 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Usuários</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white font-semibold">teste@reelforge.com</p>
                <p className="text-gray-400 text-sm">Role: user</p>
                <p className="text-gray-500 text-xs mt-2">Criado em: hoje</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white font-semibold">admin@reelforge.com</p>
                <p className="text-gray-400 text-sm">Role: admin</p>
                <p className="text-gray-500 text-xs mt-2">Você</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="p-8 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Configurações</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-purple-500/20 border border-purple-500/50">
                <p className="text-white font-semibold mb-2">API Keys</p>
                <p className="text-gray-300 text-sm">Replicate API: Configurado</p>
                <p className="text-gray-300 text-sm">Supabase: Configurado</p>
                <p className="text-gray-300 text-sm">NextAuth: Configurado</p>
              </div>
              <div className="p-4 rounded-lg bg-pink-500/20 border border-pink-500/50">
                <p className="text-white font-semibold mb-2">Sistema</p>
                <p className="text-gray-300 text-sm">Status: Online ✓</p>
                <p className="text-gray-300 text-sm">Database: Connected ✓</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50">
          <h2 className="text-2xl font-bold text-white mb-6">Ações Rápidas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
              Ver Todos os Usuários
            </button>
            <button className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition">
              Gerar Relatório
            </button>
            <button className="px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold transition">
              Configurar Sistema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
