const { Client } = require('pg');

const SQL = `
  -- Insert dummy data into users
  INSERT INTO users (username, full_name, password, membership_status) VALUES
    ('marineadiasse', 'Marine Adiasse', 'password', 'member'),
    ('carolinecarpentier', 'Caroline Carpentier', 'password', 'member'),
    ('yvescarpentier', 'Yves Carpentier', 'password', 'non-member'),
    ('maximilienammeux', 'Maximilien Ammeux', 'password', 'non-member');

     -- Insert dummy data into messages
  INSERT INTO messages (title, content, user_id) VALUES
    ('Hello', 'This is a test message', 1),
    ('Bonjour', 'C''est un message de test', 2),
    ('Hola', 'Este es un mensaje de prueba', 3),
    ('Hallo', 'Dies ist eine Testnachricht', 4),
    ('Ciao', 'Questo è un messaggio di prova', 5);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: "postgresql://valenscarpentier:a2s8zzqr@localhost:5432/members_app_db",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();