'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Plus, Grid, History } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState<'generator' | 'videos'>('generator');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ReelForge
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">{session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'generator'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Plus className="w-5 h-5" />
            Criar Vídeo
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'videos'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <History className="w-5 h-5" />
            Meus Vídeos
          </button>
        </div>

        {/* Content */}
        {activeTab === 'generator' ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Gerar Novo Vídeo</h2>

            <div className="space-y-6">
              {/* Upload de Foto */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Foto do Produto
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-400 transition cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" id="photo-upload" />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="text-gray-400">
                      <Plus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-semibold mb-1">Clique ou arraste uma foto</p>
                      <p className="text-sm">PNG, JPG até 10MB</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Dados do Produto */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome do Produto
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Tênis Esportivo"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    placeholder="Ex: Confortável, resistente e estiloso..."
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preço
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 149.90"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Estilos */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Estilos de Vídeo
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: '1', name: 'Avatar' },
                    { id: '2', name: 'Carrossel' },
                    { id: '3', name: 'Animação' },
                    { id: '4', name: 'Apresentação' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      className="p-4 rounded-lg border-2 border-white/20 text-white hover:border-purple-400 hover:bg-purple-400/10 transition"
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Velocidade */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Velocidade de Geração
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 rounded-lg border-2 border-purple-400 bg-purple-400/10 text-white">
                    ⚡ Rápido (1-2 min)
                  </button>
                  <button className="p-4 rounded-lg border-2 border-white/20 text-white hover:border-purple-400">
                    🎬 Padrão (5-10 min)
                  </button>
                </div>
              </div>

              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition">
                Gerar Vídeos
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {videos.length === 0 ? (
              <div className="md:col-span-3 text-center py-12">
                <Grid className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
                <p className="text-gray-400">Nenhum vídeo gerado ainda</p>
                <button
                  onClick={() => setActiveTab('generator')}
                  className="mt-4 px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  Criar Primeiro Vídeo
                </button>
              </div>
            ) : (
              videos.map((video: any) => (
                <div key={video.id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition">
                  <div className="aspect-video bg-black/30" />
                  <div className="p-4">
                    <p className="text-white font-semibold">{video.name}</p>
                    <p className="text-sm text-gray-400">{video.style}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
