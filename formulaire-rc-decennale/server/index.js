import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const dbPath = path.join(__dirname, 'database.json');

app.use(cors());
app.use(bodyParser.json());

const readDb = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { adminPassword: 'admin', accounts: [] };
  }
};

const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const generateRandomString = (length) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

app.post('/api/login', (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) return res.status(400).json({ error: 'Login et mot de passe requis.' });

  const db = readDb();
  const accountIndex = db.accounts.findIndex(acc => acc.login === login && acc.password === password);

  if (accountIndex === -1) {
    return res.status(401).json({ error: 'Identifiants invalides.' });
  }

  const account = db.accounts[accountIndex];

  // Si c'est la première connexion, on peut optionnellement marquer qu'il s'est connecté au moins une fois
  if (!account.startedAt) {
    account.startedAt = Date.now();
    writeDb(db);
  }

  // Connexion toujours valide pour les commerciaux
  return res.json({ success: true, token: account.token, name: account.name || account.login });
});

app.post('/api/admin/add', (req, res) => {
  const { adminPassword, name, login, password } = req.body;
  const db = readDb();

  if (adminPassword !== db.adminPassword) {
    return res.status(403).json({ error: 'Mot de passe administrateur incorrect.' });
  }

  if (!name || !login || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Vérifier si le login existe déjà
  if (db.accounts.some(acc => acc.login === login)) {
    return res.status(400).json({ error: 'Ce login existe déjà.' });
  }

  const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const newAccount = {
    name,
    login,
    password,
    startedAt: null,
    documentsGenerated: 0,
    token: generateRandomString(16),
    createdAt: Date.now()
  };

  db.accounts.push(newAccount);
  writeDb(db);

  res.json({ success: true, account: newAccount });
});

app.post('/api/admin/edit', (req, res) => {
  const { adminPassword, oldLogin, name, login, password } = req.body;
  const db = readDb();

  if (adminPassword !== db.adminPassword) {
    return res.status(403).json({ error: 'Mot de passe administrateur incorrect.' });
  }

  if (!oldLogin || !name || !login || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const accountIndex = db.accounts.findIndex(acc => acc.login === oldLogin);
  if (accountIndex === -1) {
    return res.status(404).json({ error: 'Compte introuvable.' });
  }

  // Si on change le login, vérifier qu'il n'existe pas déjà ailleurs
  if (oldLogin !== login && db.accounts.some(acc => acc.login === login)) {
    return res.status(400).json({ error: 'Ce nouveau login existe déjà.' });
  }

  db.accounts[accountIndex].name = name;
  db.accounts[accountIndex].login = login;
  db.accounts[accountIndex].password = password;
  writeDb(db);

  res.json({ success: true });
});

app.post('/api/admin/delete', (req, res) => {
  const { adminPassword, login } = req.body;
  const db = readDb();

  if (adminPassword !== db.adminPassword) {
    return res.status(403).json({ error: 'Mot de passe administrateur incorrect.' });
  }

  if (!login) {
    return res.status(400).json({ error: 'Login requis.' });
  }

  const accountIndex = db.accounts.findIndex(acc => acc.login === login);
  if (accountIndex === -1) {
    return res.status(404).json({ error: 'Compte introuvable.' });
  }

  db.accounts.splice(accountIndex, 1);
  writeDb(db);

  res.json({ success: true });
});

app.post('/api/admin/list', (req, res) => {
  const { adminPassword } = req.body;
  const db = readDb();

  if (adminPassword !== db.adminPassword) {
    return res.status(403).json({ error: 'Mot de passe administrateur incorrect.' });
  }

  const accounts = db.accounts.map(acc => {
    return {
      name: acc.name || 'Commercial',
      login: acc.login,
      password: acc.password,
      documentsGenerated: acc.documentsGenerated || 0,
      createdAt: acc.createdAt
    };
  }).sort((a, b) => b.createdAt - a.createdAt);

  res.json({ success: true, accounts });
});

// Endpoint pour vérifier la validité de la session via le token
app.post('/api/verify', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token requis.' });

  const db = readDb();
  const account = db.accounts.find(acc => acc.token === token);

  if (!account) return res.status(401).json({ error: 'Session invalide.' });

  res.json({ success: true, name: account.name || account.login });
});

app.post('/api/increment', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token requis.' });

  const db = readDb();
  const account = db.accounts.find(acc => acc.token === token);

  if (!account) return res.status(401).json({ error: 'Session invalide.' });

  account.documentsGenerated = (account.documentsGenerated || 0) + 1;
  writeDb(db);

  res.json({ success: true, documentsGenerated: account.documentsGenerated });
});

app.listen(port, () => {
  console.log(`Serveur API démarré sur http://localhost:${port}`);
});
