import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, MessageCircle } from 'lucide-react';
import DocumentTemplate from './DocumentTemplate';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    raisonSociale: '',
    nomDirigeant: '',
    formeJuridique: '',
    siret: '',
    enCoursCreation: false,
    adresse: '',
    ville: '',
    codePostal: '',
    telephone: '',
    mobile: '',
    email: '',
    ppe: 'NON',
    ppeLien: 'NON',
    prioriteCout: false,
    prioriteConformite: false,
    prioriteEtendue: false,
    montantMax: '',
    contratPropose: '',
    motifChoix: '',
    checkConnaissance: false,
    checkInfos: false,
    checkRefus: false,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  
  const documentRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    
    // Un petit délai pour s'assurer que le composant caché est bien à jour
    setTimeout(() => {
      const element = documentRef.current;
      
      const opt = {
        margin:       0,
        filename:     `RC_Decennale_${formData.raisonSociale || 'Client'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: 'css' }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        setIsGenerating(false);
      }).catch((err) => {
        console.error('Erreur PDF:', err);
        setIsGenerating(false);
        alert('Erreur lors de la génération du PDF.');
      });
    }, 100);
  };

  const generateWhatsApp = () => {
    const message = `
*NOUVEAU DOSSIER - RC DÉCENNALE*

*1. INFORMATIONS ADHÉRENT*
*Raison Sociale* : ${formData.raisonSociale || 'Non renseigné'}
*Dirigeant* : ${formData.nomDirigeant || 'Non renseigné'}
*Forme Juridique* : ${formData.formeJuridique || 'Non renseigné'}
*SIRET* : ${formData.siret || 'Non renseigné'} ${formData.enCoursCreation ? '(En cours de création)' : ''}

*2. COORDONNÉES*
*Adresse* : ${formData.adresse || 'Non renseigné'}
*Code Postal* : ${formData.codePostal || 'Non renseigné'}
*Ville* : ${formData.ville || 'Non renseigné'}
*Tel Fixe* : ${formData.telephone || 'Non renseigné'}
*Mobile* : ${formData.mobile || 'Non renseigné'}
*Email* : ${formData.email || 'Non renseigné'}

*3. CONFORMITÉ (PPE)*
*PPE* : ${formData.ppe}
*Lien avec PPE* : ${formData.ppeLien}

*4. RECUEIL DES BESOINS*
*Priorités :*
${[
  formData.prioriteCout ? "- Le coût (Prime compétitive)" : null,
  formData.prioriteConformite ? "- La conformité / Rapidité" : null,
  formData.prioriteEtendue ? "- L'étendue des garanties" : null
].filter(Boolean).join('\n')}
*Montant maximal des chantiers* : ${formData.montantMax ? formData.montantMax + ' €' : 'Non renseigné'}

*5. SOLUTION PROPOSÉE*
*Contrat recommandé* : ${formData.contratPropose || 'Non renseigné'}
*Motif du choix* : ${formData.motifChoix || 'Non renseigné'}

*6. DÉCLARATIONS DU CLIENT*
${[
  formData.checkConnaissance ? "✅ A pris connaissance du document d'information" : null,
  formData.checkInfos ? "✅ Accepte de recevoir des offres/actualités" : null,
  formData.checkRefus ? "✅ A conscience des risques en cas de refus d'information" : null
].filter(Boolean).join('\n')}    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="app-container animate-fade-in">
      <div className="header">
        <h1>RC Décennale</h1>
        <p>Formulaire d'adhésion Amadis Courtage</p>
      </div>

      {/* Le formulaire visible */}
      <div className="glass-card">
        <h2 className="section-title">Informations de l'Entreprise</h2>
        <div className="form-grid two-cols">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Raison Sociale / Nom commercial</label>
            <input type="text" name="raisonSociale" value={formData.raisonSociale} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Nom et Prénom du dirigeant</label>
            <input type="text" name="nomDirigeant" value={formData.nomDirigeant} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Forme juridique</label>
            <input type="text" name="formeJuridique" value={formData.formeJuridique} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">N° SIRET</label>
            <input type="text" name="siret" value={formData.siret} onChange={handleChange} className="form-input" />
            <label className="checkbox-label" style={{ marginTop: '0.5rem', padding: '0.5rem' }}>
              <input type="checkbox" name="enCoursCreation" checked={formData.enCoursCreation} onChange={handleChange} />
              Société en cours de création
            </label>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h2 className="section-title">Coordonnées</h2>
        <div className="form-grid two-cols">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Adresse du siège social</label>
            <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Code postal</label>
            <input type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Ville</label>
            <input type="text" name="ville" value={formData.ville} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Téléphone fixe</label>
            <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">E-mail</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h2 className="section-title">Conformité (PPE)</h2>
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label">Êtes-vous une Personne Politiquement Exposée (PPE) ?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="ppe" value="OUI" checked={formData.ppe === 'OUI'} onChange={handleChange} /> Oui
            </label>
            <label className="radio-label">
              <input type="radio" name="ppe" value="NON" checked={formData.ppe === 'NON'} onChange={handleChange} /> Non
            </label>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Avez-vous un lien familial avec une PPE ?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="ppeLien" value="OUI" checked={formData.ppeLien === 'OUI'} onChange={handleChange} /> Oui
            </label>
            <label className="radio-label">
              <input type="radio" name="ppeLien" value="NON" checked={formData.ppeLien === 'NON'} onChange={handleChange} /> Non
            </label>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h2 className="section-title">Recueil des Besoins</h2>
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label className="form-label" style={{ marginBottom: '1rem' }}>Priorités du client :</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="prioriteCout" checked={formData.prioriteCout} onChange={handleChange} />
              <div><strong>Le coût :</strong> Recherche de la prime la plus compétitive.</div>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="prioriteConformite" checked={formData.prioriteConformite} onChange={handleChange} />
              <div><strong>La conformité :</strong> Obtention urgente d'une attestation.</div>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="prioriteEtendue" checked={formData.prioriteEtendue} onChange={handleChange} />
              <div><strong>L'étendue :</strong> Besoin de plafonds de garantie élevés.</div>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Montant maximal des chantiers envisagés (€)</label>
          <input type="number" name="montantMax" value={formData.montantMax} onChange={handleChange} className="form-input" />
        </div>
      </div>

      <div className="glass-card">
        <h2 className="section-title">Solution d'assurance proposée (Rempli par le courtier)</h2>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label className="form-label">Contrat(s)/Garantie(s) recommandé(s)</label>
          <input type="text" name="contratPropose" value={formData.contratPropose} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Motif(s) de ce choix</label>
          <input type="text" name="motifChoix" value={formData.motifChoix} onChange={handleChange} className="form-input" />
        </div>
      </div>

      <div className="glass-card">
        <h2 className="section-title">Déclarations et Signature</h2>
        
        <div className="checkbox-group" style={{ marginBottom: '2rem' }}>
          <label className="checkbox-label">
            <input type="checkbox" name="checkConnaissance" checked={formData.checkConnaissance} onChange={handleChange} />
            <div>Je reconnais avoir pris connaissance de ce document...</div>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="checkInfos" checked={formData.checkInfos} onChange={handleChange} />
            <div>Je souhaite être informé par courrier/sms des actualités...</div>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="checkRefus" checked={formData.checkRefus} onChange={handleChange} />
            <div>J’ai parfaitement conscience que le refus de communiquer...</div>
          </label>
        </div>
      </div>

      <div className="actions-container">
        <button onClick={generatePDF} disabled={isGenerating} className="btn btn-primary">
          {isGenerating ? <div className="loading-spinner" /> : <Download size={20} />}
          {isGenerating ? 'Génération du document V2...' : 'Générer le PDF (Design Natif)'}
        </button>
        
        <button onClick={generateWhatsApp} className="btn btn-whatsapp">
          <MessageCircle size={20} />
          Préparer le message WhatsApp
        </button>
      </div>

      {/* Le conteneur caché pour html2pdf */}
      <div className="pdf-hidden-container">
        <DocumentTemplate ref={documentRef} data={formData} />
      </div>

    </div>
  );
}

export default App;
