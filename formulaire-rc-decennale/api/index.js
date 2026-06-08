import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { kv } from '@vercel/kv';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const DB_KEY = 'rc_decennale_db';

const readDb = async () => {
  try {
    const data = await kv.get(DB_KEY);
    if (data) return data;
    return { adminPassword: 'admin', accounts: [] };
  } catch (err) {
    console.error('Erreur KV readDb:', err);
    return { adminPassword: 'admin', accounts: [] };
  }
};

const writeDb = async (data) => {
  try {
    await kv.set(DB_KEY, data);
  } catch (err) {
    console.error('Erreur KV writeDb:', err);
  }
};

app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) return res.status(400).json({ error: 'Login et mot de passe requis.' });

  const db = await readDb();
  const accountIndex = db.accounts.findIndex(acc => acc.login === login && acc.password === password);

  if (accountIndex === -1) {
    return res.status(401).json({ error: 'Identifiants invalides.' });
  }

  const account = db.accounts[accountIndex];

  if (!account.startedAt) {
    account.startedAt = Date.now();
    await writeDb(db);
  }

  return res.json({ success: true, token: account.token, name: account.name || account.login });
});

app.post('/api/admin/add', async (req, res) => {
  const { adminPassword, name, login, password } = req.body;
  const db = await readDb();

  if (adminPassword !== db.adminPassword) {
    return res.status(403).json({ error: 'Mot de passe administrateur incorrect.' });
  }

  if (!name || !login || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

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
  await writeDb(db);

  res.json({ success: true, account: newAccount });
});

app.post('/api/admin/edit', async (req, res) => {
  const { adminPassword, oldLogin, name, login, password } = req.body;
  const db = await readDb();

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

  if (oldLogin !== login && db.accounts.some(acc => acc.login === login)) {
    return res.status(400).json({ error: 'Ce nouveau login existe déjà.' });
  }

  db.accounts[accountIndex].name = name;
  db.accounts[accountIndex].login = login;
  db.accounts[accountIndex].password = password;
  await writeDb(db);

  res.json({ success: true });
});

app.post('/api/admin/delete', async (req, res) => {
  const { adminPassword, login } = req.body;
  const db = await readDb();

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
  await writeDb(db);

  res.json({ success: true });
});

app.post('/api/admin/list', async (req, res) => {
  const { adminPassword } = req.body;
  const db = await readDb();

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

app.post('/api/verify', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token requis.' });

  const db = await readDb();
  const account = db.accounts.find(acc => acc.token === token);

  if (!account) return res.status(401).json({ error: 'Session invalide.' });

  res.json({ success: true, name: account.name || account.login });
});

app.post('/api/increment', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token requis.' });

  const db = await readDb();
  const account = db.accounts.find(acc => acc.token === token);

  if (!account) return res.status(401).json({ error: 'Session invalide.' });

  account.documentsGenerated = (account.documentsGenerated || 0) + 1;
  await writeDb(db);

  res.json({ success: true, documentsGenerated: account.documentsGenerated });
});

// Important: pour Vercel Serverless Functions, il faut exporter l'app Express
export default app;
