import React, { useState } from 'react';

function Admin() {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Nouvel état pour le formulaire d'ajout/modification
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOldLogin, setEditingOldLogin] = useState('');
  const [newCommercial, setNewCommercial] = useState({ name: '', login: '', password: '' });
  const [addError, setAddError] = useState('');

  const fetchAccounts = async (pwd) => {
    try {
      const res = await fetch('http://localhost:3001/api/admin/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: pwd })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAccounts(data.accounts);
        return true;
      } else {
        setError(data.error || 'Erreur d\'authentification');
        return false;
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.');
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const success = await fetchAccounts(adminPassword);
    if (success) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  const handleAddCommercial = async (e) => {
    e.preventDefault();
    setAddError('');
    if (!newCommercial.name || !newCommercial.login || !newCommercial.password) {
      setAddError('Veuillez remplir tous les champs.');
      return;
    }
    
    setIsLoading(true);
    try {
      const endpoint = isEditing ? 'http://localhost:3001/api/admin/edit' : 'http://localhost:3001/api/admin/add';
      const bodyData = isEditing 
        ? { adminPassword, oldLogin: editingOldLogin, ...newCommercial }
        : { adminPassword, ...newCommercial };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await fetchAccounts(adminPassword);
        setShowAddForm(false);
        setIsEditing(false);
        setNewCommercial({ name: '', login: '', password: '' });
      } else {
        setAddError(data.error || 'Erreur inconnue');
      }
    } catch (err) {
      setAddError('Erreur réseau');
    }
    setIsLoading(false);
  };

  const startEdit = (acc) => {
    setNewCommercial({ name: acc.name, login: acc.login, password: acc.password });
    setEditingOldLogin(acc.login);
    setIsEditing(true);
    setShowAddForm(true);
    setAddError('');
  };

  const handleDelete = async (login) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet accès ?')) return;
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword, login })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await fetchAccounts(adminPassword);
      } else {
        alert(data.error || 'Erreur lors de la suppression');
      }
    } catch (err) {
      alert('Erreur réseau');
    }
    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
          <h2>Administration</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Mot de passe Admin" 
              value={adminPassword} 
              onChange={(e) => setAdminPassword(e.target.value)} 
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              Connexion
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ padding: '2rem', maxWidth: '1000px' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Gestion des Commerciaux</h2>
          <button onClick={() => {
            setShowAddForm(!showAddForm);
            if (showAddForm) {
              setIsEditing(false);
              setNewCommercial({ name: '', login: '', password: '' });
            }
          }} className="btn btn-primary" style={{ width: 'auto' }}>
            {showAddForm ? 'Annuler' : '+ Ajouter nouveau commercial'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddCommercial} style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h3 style={{ marginBottom: '1rem', color: '#374151' }}>{isEditing ? 'Modifier l\'accès commercial' : 'Créer un accès commercial'}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Nom du Commercial</label>
                <input type="text" className="form-input" value={newCommercial.name} onChange={(e) => setNewCommercial({...newCommercial, name: e.target.value})} placeholder="Ex: Jean Dupont" />
              </div>
              <div className="form-group">
                <label className="form-label">Identifiant (Login)</label>
                <input type="text" className="form-input" value={newCommercial.login} onChange={(e) => setNewCommercial({...newCommercial, login: e.target.value})} placeholder="Ex: jean.dupont" />
              </div>
              <div className="form-group">
                <label className="form-label">Mot de passe</label>
                <input type="text" className="form-input" value={newCommercial.password} onChange={(e) => setNewCommercial({...newCommercial, password: e.target.value})} placeholder="Mot de passe" />
              </div>
            </div>
            {addError && <div style={{ color: '#ef4444', marginTop: '1rem' }}>{addError}</div>}
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: 'auto' }} disabled={isLoading}>
              {isEditing ? 'Sauvegarder les modifications' : 'Enregistrer'}
            </button>
          </form>
        )}

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Commercial</th>
              <th style={{ padding: '1rem' }}>Login</th>
              <th style={{ padding: '1rem' }}>Mot de passe</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Documents Générés</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(acc => (
              <tr key={acc.login} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{acc.name}</td>
                <td style={{ padding: '1rem' }}>{acc.login}</td>
                <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '1.1rem' }}>{acc.password}</td>
                <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#166534' }}>
                  <span style={{ background: '#dcfce7', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                    {acc.documentsGenerated}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => startEdit(acc)} style={{ padding: '0.4rem 0.8rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }} disabled={isLoading}>Modifier</button>
                    <button onClick={() => handleDelete(acc.login)} style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }} disabled={isLoading}>Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  Aucun compte commercial créé pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
