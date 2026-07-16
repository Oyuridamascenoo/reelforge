'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Error() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Erro de Autenticação</h1>
          <p className="text-gray-300 mb-6">
            Ocorreu um erro ao tentar fazer login. Verifique suas credenciais e tente novamente.
          </p>
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition"
          >
            Voltar ao Login
          </Link>
        </div>
      </div>
    </div>
  );
}
