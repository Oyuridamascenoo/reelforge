import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://rdibwyxtzlzaouobahin.supabase.co';
const serviceRoleKey = process.argv[2];

if (!serviceRoleKey) {
  console.error('❌ Erro: Passe a service role key como argumento');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function executeSQL(sql) {
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/pg_exec`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify({ sql })
  });
  return response;
}

async function setupDatabase() {
  try {
    console.log('📦 Configurando banco de dados via SQL...\n');

    // Read SQL file
    const sqlPath = path.join(__dirname, '..', 'config', 'database.sql');
    const fullSQL = fs.readFileSync(sqlPath, 'utf-8');

    // Parse and execute each statement
    const statements = fullSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));

    console.log(`📝 Encontradas ${statements.length} declarações SQL\n`);

    // Try to fetch Supabase connection details
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`
      }
    });

    if (response.ok) {
      console.log('✅ Conectado ao Supabase!\n');
      console.log('⚠️  Não é possível executar SQL diretamente via API.');
      console.log('💡 Por favor, execute os passos manualmente:\n');
      console.log('1. Acesse: https://app.supabase.com');
      console.log('2. Vá em: SQL Editor');
      console.log('3. Clique em: New Query');
      console.log('4. Cole o SQL abaixo:\n');
      console.log('═'.repeat(50));
      console.log(fullSQL);
      console.log('═'.repeat(50));
      console.log('\n5. Clique em: Run');
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

setupDatabase();
