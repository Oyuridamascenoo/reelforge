const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Erro: NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('📦 Configurando banco de dados...');

    // Read SQL file
    const sqlPath = path.join(__dirname, '..', 'config', 'database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(s => s.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc('exec_sql', { sql: statement.trim() }).catch(() => ({
          error: { message: 'exec_sql not available, use Supabase web UI' }
        }));

        if (error) {
          console.warn(`⚠️  ${error.message}`);
        }
      }
    }

    console.log('✅ Banco de dados configurado!');
    console.log('\n📝 Próximos passos:');
    console.log('1. Acesse: https://app.supabase.com');
    console.log('2. Vá em: SQL Editor');
    console.log('3. Cole o conteúdo de: config/database.sql');
    console.log('4. Execute o SQL');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

setupDatabase();
