import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Download, MessageCircle } from 'lucide-react';
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
    honorairesHT: '',
    honorairesTTC: '',
    contratPropose: '',
    motifChoix: '',
  });

  const today = new Date().toLocaleDateString('fr-FR');

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // 1. Charger le PDF existant depuis le dossier public
      const existingPdfBytes = await fetch('/fiche_rc_decennale.pdf').then((res) => res.arrayBuffer());
      
      // 2. Créer un document pdf-lib à partir de ces bytes
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      const pages = pdfDoc.getPages();
      const page2 = pages[1];
      const page3 = pages[2];

      // Fonction utilitaire pour écrire du texte
      const drawText = (page, text, x, y, size = 10, color = rgb(1, 1, 1), font = helveticaFont) => {
        if (!text) return;
        page.drawText(text.toString(), {
          x,
          y,
          size,
          font: font,
          color: color,
        });
      };

      // --- PAGE 2 : Ajustements ---
      drawText(page2, formData.raisonSociale, 265, 747);
      drawText(page2, formData.nomDirigeant, 265, 722);
      drawText(page2, formData.formeJuridique, 265, 697);
      drawText(page2, formData.siret, 265, 674);
      if (formData.enCoursCreation) drawText(page2, 'X', 515, 675, 12);
      
      drawText(page2, formData.adresse, 265, 649);
      drawText(page2, formData.ville, 140, 631);
      drawText(page2, formData.codePostal, 440, 631);
      drawText(page2, formData.telephone, 140, 606);
      drawText(page2, formData.mobile, 440, 606);
      drawText(page2, formData.email, 140, 583);

      // Conformité (PPE)
      if (formData.ppe === 'OUI') drawText(page2, 'X', 323, 563, 12);
      if (formData.ppe === 'NON') drawText(page2, 'X', 373, 562, 12);
      if (formData.ppeLien === 'OUI') drawText(page2, 'X', 372, 548, 12);
      if (formData.ppeLien === 'NON') drawText(page2, 'X', 420, 549, 12);
      
      // Recueil des besoins (Priorités)
      if (formData.prioriteCout) drawText(page2, 'X', 20, 410, 14);
      if (formData.prioriteConformite) drawText(page2, 'X', 20, 396, 14);
      if (formData.prioriteEtendue) drawText(page2, 'X', 20, 381, 14);

      drawText(page2, formData.montantMax, 365, 340, 11, rgb(0, 0, 0), helveticaBoldFont);

      // --- PAGE 3 : Ajustements ---
      drawText(page3, formData.contratPropose, 50, 316);
      drawText(page3, formData.motifChoix, 200, 295);

      // Conditions Financières (Coordonnées approximatives, à ajuster si besoin)
      if (formData.honorairesHT) {
        drawText(page3, formData.honorairesHT, 270, 750, 11, rgb(0, 0, 0), helveticaBoldFont); // HT
      }
      if (formData.honorairesTTC) {
        drawText(page3, formData.honorairesTTC, 360, 750, 11, rgb(0, 0, 0), helveticaBoldFont); // TTC
      }

      // Signature Date
      drawText(page3, today, 100, 118);

      // 3. Sauvegarder et télécharger
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `RC_Decennale_${formData.raisonSociale || 'Client'}.pdf`;
      link.click();

    } catch (error) {
      console.error('Erreur PDF:', error);
      alert('Erreur lors de la génération du PDF avec pdf-lib.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWhatsApp = () => {
    const message = `
*NOUVEAU DOSSIER - RC DÉCENNALE*
*Date* : ${today}

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

*6. CONDITIONS FINANCIÈRES*
*Honoraires HT* : ${formData.honorairesHT ? formData.honorairesHT + ' €' : 'Non renseigné'}
*Honoraires TTC* : ${formData.honorairesTTC ? formData.honorairesTTC + ' €' : 'Non renseigné'}
    `.trim();

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
        <h2 className="section-title">Conditions Financières</h2>
        <div className="form-grid two-cols">
          <div className="form-group">
            <label className="form-label">Forfait d'honoraires HT (€)</label>
            <input type="number" name="honorairesHT" value={formData.honorairesHT} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Forfait d'honoraires TTC (€)</label>
            <input type="number" name="honorairesTTC" value={formData.honorairesTTC} onChange={handleChange} className="form-input" />
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h2 className="section-title">Date du jour</h2>
        <div className="form-group">
          <p style={{ fontSize: '1.1rem', color: 'var(--text-color)', fontWeight: '500' }}>
            Date : {today}
          </p>
        </div>
      </div>

      <div className="actions-container">
        <button onClick={generatePDF} disabled={isGenerating} className="btn btn-primary">
          {isGenerating ? <div className="loading-spinner" /> : <Download size={20} />}
          {isGenerating ? 'Génération du document V2...' : 'Générer le PDF'}
        </button>
        
        <button onClick={generateWhatsApp} className="btn btn-whatsapp">
          <MessageCircle size={20} />
          Préparer le message WhatsApp
        </button>
      </div>

    </div>
  );
}

export default App;
