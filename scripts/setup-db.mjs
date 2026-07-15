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
  console.error('Uso: node setup-db.mjs "sua_service_role_key"');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setupDatabase() {
  try {
    console.log('📦 Configurando banco de dados...\n');

    // Read SQL file
    const sqlPath = path.join(__dirname, '..', 'config', 'database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    // Execute full SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql });

    if (error) {
      // Try alternative approach - split by statements
      console.log('⚠️  Tentando executar linha por linha...\n');

      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s && !s.startsWith('--'));

      let successCount = 0;
      for (const statement of statements) {
        try {
          const { error: stmtError } = await supabase.rpc('exec_sql', { sql: statement });
          if (!stmtError) {
            successCount++;
            console.log(`✅ ${statement.substring(0, 60)}...`);
          } else {
            console.log(`⚠️  ${statement.substring(0, 60)}... (${stmtError.message})`);
          }
        } catch (e) {
          console.log(`⚠️  ${statement.substring(0, 60)}... (erro)`);
        }
      }

      console.log(`\n✅ Executadas ${successCount} declarações SQL`);
    } else {
      console.log('✅ Banco de dados configurado com sucesso!');
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

setupDatabase();
