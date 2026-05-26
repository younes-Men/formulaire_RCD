import React from 'react';
import './document.css';

const DocumentTemplate = React.forwardRef(({ data, signatureDataUrl }, ref) => {
  const today = new Date().toLocaleDateString('fr-FR');

  return (
    <div ref={ref} className="pdf-document">
      {/* PAGE 1 */}
      <div className="pdf-page">
        <div className="pdf-header">
          <div className="pdf-title-box">
            <h1>FICHE D'INFORMATION ET DE CONSEIL</h1>
          </div>
          <img src="/logo_amadis.jpg" alt="Amadis Courtage" className="pdf-logo" />
        </div>
        <div className="pdf-version">V. 24.05.2026</div>

        <div className="pdf-intro-box">
          Cette fiche d’information et de conseil est établie en application des articles L.521-2, L.522-5 et R.521-1 du code des assurances.
          La présente fiche résume toutes les informations que le conseiller ou sa société doivent avoir communiquées au client dès le début de la relation. De plus, elle permet de recueillir les informations auprès de vous qui sont nécessaires afin de vous conseiller un contrat d’assurance cohérent avec vos exigences et besoins. De ce fait, les informations fournies doivent être les plus complètes et sincères possibles.
        </div>

        <div className="pdf-section-title dark-blue">INFORMATIONS CONCERNANT LE CABINET</div>

        <div className="pdf-columns">
          <div className="pdf-col">
            <h4>I. Identification de la société</h4>
            <div className="pdf-societe-info">
              <p><span>Nom du cabinet :</span> <strong>AMADIS COURTAGE</strong></p>
              <p><span>Adresse postale :</span> <strong>25 RUE DE PONTHIEU</strong> Code postal : <strong>75008</strong></p>
              <p><span>Ville :</span> <strong>PARIS</strong></p>
              <p><span>Forme juridique de la structure :</span> <strong>EURL</strong></p>
              <p><span>Montant du capital social :</span> <strong>250,00 EUR</strong></p>
              <p><span>Numéro de SIREN :</span> <strong>934 550 633</strong></p>
              <p><span>Numéro d’immatriculation à l’ORIAS :</span> <strong>24008492</strong></p>
              <p><span>Téléphone :</span> <strong>+33 1 84 80 82 14</strong></p>
              <p><span>E-mail :</span> <strong className="orange">gestion@amadiscourtage.fr</strong></p>
            </div>

            <h4>II. Coordonnées de l’ACPR</h4>
            <p className="pdf-text-small">Exerce sous le contrôle de l’ACPR (Autorité de Contrôle Prudentiel et de Résolution), 4 place de Budapest, CS 92459, 75436 Paris Cedex 09, www.acpr.banque-france.fr, Tel + (33) 01 49 95 40 00.</p>

            <h4>III. Couverture en RC professionnelle et garantie financière</h4>
            <p className="pdf-text-small"><strong>AMADIS COURTAGE</strong> a souscrit une assurance Responsabilité Civile Professionnelle et Garantie Financière conformes aux articles L.512-6 et L.512-7 du code des assurances.</p>

            <h4>IV. Liens financiers</h4>
            <p className="pdf-text-small"><strong>AMADIS COURTAGE</strong> n’est liée à aucune société financière et ne comporte aucun actionnaire lié à des sociétés de ce type et/ou compagnies d’assurances, mutuelles ou institutions. Aucun assureur ne détient donc plus de 10 % de notre capital ou n’est détenu à plus de 10 % par nous.</p>

            <h4>V. Les partenaires</h4>
            <p className="pdf-text-small"><strong>AMADIS COURTAGE</strong> n’est pas soumis à une obligation contractuelle de travailler exclusivement avec une ou plusieurs compagnies d’assurance et dispose d’un service de recommandation fondé sur une analyse impartiale et personnalisée, selon la définition du c) du 1er du II de l’article L.521-2 du code des assurances.</p>

            <h4>VI. La rémunération</h4>
            <p className="pdf-text-small">La rémunération de <strong>AMADIS COURTAGE</strong> se compose :</p>
            <ul className="pdf-list-small">
              <li><strong>Sur la base de Commissions</strong> payées par les partenaires, c’est-à-dire une rémunération incluse dans la prime d’assurance qui dépend du partenaire et de la nature du contrat. Conformément à la réglementation, le client dispose du droit de demander la communication du montant ou de la méthode de calcul de cette commission.</li>
              <li><strong>Sur la base d’honoraires</strong> c’est-à-dire sous la forme d’une rémunération, frais de courtage, payée directement par le client à <strong>AMADIS COURTAGE</strong>.</li>
              <li><strong>Sur la base d’honoraires</strong> de conseil, d'audit et de frais de recherche : rémunération forfaitaire payée directement par le client à <strong>AMADIS COURTAGE</strong> pour l'analyse personnalisée du risque, l'étude des antécédents d'activité et la recherche de solutions adaptées sur le marché (notamment pour les risques spécifiques ou complexes tels que la Responsabilité Civile Décennale). Ces honoraires sont <strong>non remboursables</strong> et dus conformément aux termes de la mission signée par le client sur le présent document, et selon le montant ou le barème convenu ci-après, indépendamment de la souscription finale du contrat d'assurance.</li>
            </ul>
          </div>

          <div className="pdf-col">
            <p className="pdf-text-small">Ces différents modes de rémunération peuvent, le cas échéant, se cumuler pour une même opération.</p>
            
            <h4>VII. Traitement des réclamations et médiation</h4>
            <ul className="pdf-list-small">
              <li>En cas de mécontentement, nous vous invitons à contacter au préalable votre interlocuteur habituel chez <strong>AMADIS COURTAGE</strong>.</li>
              <li>Si la réponse apportée à votre réclamation n’est pas satisfaisante, vous pouvez contacter notre service RÉCLAMATION par e-mail à : <span className="orange">reclamations@amadiscourtage.fr</span></li>
              <li>Si vous n’êtes toujours pas satisfait de la réponse apportée à votre réclamation, vous pouvez saisir le médiateur : La médiation de l’assurance - TSA 50110 – 75441 PARIS CEDEX 09, https://www.mediation-assurance.org.</li>
            </ul>

            <h4>VIII. Protection des données personnelles</h4>
            <p className="pdf-text-small"><strong>AMADIS COURTAGE</strong> s’engage à une utilisation responsable des données personnelles qu’elle traite conformément aux règles en vigueur prévues par le Règlement Général sur la Protection des Données n°2016-679 du 27 avril 2016 et la loi n°78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés.</p>
            <ul className="pdf-list-small">
              <li><strong>Finalité de la collecte</strong></li>
            </ul>
            <p className="pdf-text-small">Vos données sont collectées et traitées de manière loyale et licite. Elles sont collectées pour des finalités déterminées, explicites et légitimes et ne sont pas traités de manière incompatible avec ces finalités. Seules les données qui sont utiles à la société sont collectées. Les données collectées doivent être exactes et complètes.</p>
            <p className="pdf-text-small">Vos données personnelles sont collectées pour les finalités suivantes :<br/>Les informations recueillies sont nécessaires pour la gestion des contrats d'assurance.</p>
            <ul className="pdf-list-small">
              <li><strong>Destinataires de la collecte</strong></li>
            </ul>
            <p className="pdf-text-small">Les informations recueillies font l'objet d'un traitement informatique et sont destinées à <strong>AMADIS COURTAGE</strong>, ou aux compagnies d’assurances, aux prestataires, mandataires, aux co-assureurs, réassureurs et organismes participant à la gestion des contrats.</p>
            <ul className="pdf-list-small">
              <li><strong>Vos droits</strong></li>
            </ul>
            <p className="pdf-text-small">En application de la "Loi Informatique et Libertés" du 6 janvier 1978, le client dispose, s'agissant des données le concernant, d'un droit d'accès, de rectification, d'opposition et de suppression.</p>
            <p className="pdf-text-small">Ces droits peuvent être exercés en écrivant à AMADIS COURTAGE – 25 rue de Ponthieu 75008 Paris, ou par e-mail à : <span className="orange">dpo@amadiscourtage.fr</span></p>
            <p className="pdf-text-small">En cas de désaccord persistant concernant vos données, vous avez le droit de saisir la Commission Nationale Informatique et Libertés (CNIL) : https://www.cnil.fr, 3 place de Fontenoy–TSA 80715, 75334 PARIS CEDEX 07.</p>
          </div>
        </div>

        <div className="pdf-footer">
          <p className="orange">AMADIS COURTAGE | <span className="black">25 rue de Ponthieu 75008 Paris | Site web : <span className="orange-light">www.amadiscourtage.fr</span> | E-mail : <span className="orange-light">gestion@amadiscourtage.fr</span></span></p>
          <p>TEL : +33 1 84 80 82 14 | RCS Paris B 934 550 633 | N°SIRET : 93455063300010 | Orias Nº : 24008492</p>
          <div className="pdf-page-num">Page 1/3</div>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="pdf-page">
        <div className="pdf-header">
          <div className="pdf-title-box dark-blue-bg">
            <h1>FORMALISATION DU CONSEIL RC DÉCENNALE</h1>
          </div>
          <img src="/logo_amadis.jpg" alt="Amadis Courtage" className="pdf-logo" />
        </div>

        <h4>I. Informations Adhérent/Assuré(e)</h4>
        
        <div className="pdf-form-row">
          <div className="pdf-form-label">Raison Sociale / Nom commercial</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-form-value">{data.raisonSociale}</div>
        </div>
        
        <div className="pdf-form-row">
          <div className="pdf-form-label">Nom et Prénom du dirigeant / représentant légal</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-form-value">{data.nomDirigeant}</div>
        </div>
        
        <div className="pdf-form-row">
          <div className="pdf-form-label">Forme juridique</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-form-value">{data.formeJuridique}</div>
        </div>
        
        <div className="pdf-form-row">
          <div className="pdf-form-label">N° SIRET</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-form-value" style={{ width: '40%' }}>{data.siret}</div>
          <div className="pdf-form-inline-text">(Si société en cours de création : <div className="pdf-checkbox-box">{data.enCoursCreation ? 'X' : ''}</div> En cours)</div>
        </div>

        <div className="pdf-form-row">
          <div className="pdf-form-label">Adresse du siège social :</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-form-value">{data.adresse}</div>
        </div>

        <div className="pdf-form-row-multi">
          <div className="pdf-form-label-short">Ville</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-form-value" style={{ width: '35%' }}>{data.ville}</div>
          <div className="pdf-form-label-mid">Code postal</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-form-value">{data.codePostal}</div>
        </div>

        <div className="pdf-form-row-multi">
          <div className="pdf-form-label-short">Téléphone</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-form-value" style={{ width: '35%' }}>{data.telephone}</div>
          <div className="pdf-form-label-mid">Mobile</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-form-value">{data.mobile}</div>
        </div>

        <div className="pdf-form-row">
          <div className="pdf-form-label-short">E-Mail</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-form-value">{data.email}</div>
        </div>

        <div className="pdf-form-row" style={{ marginTop: '10px' }}>
          <div className="pdf-form-label-long">Êtes-vous une Personne Politiquement Exposée (PPE) ?</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-radio-group">
            <div className="pdf-checkbox-box">{data.ppe === 'OUI' ? 'X' : ''}</div> OUI
            <div className="pdf-checkbox-box" style={{ marginLeft: '15px' }}>{data.ppe === 'NON' ? 'X' : ''}</div> NON
          </div>
        </div>

        <div className="pdf-form-row">
          <div className="pdf-form-label-long">Avez-vous un lien familial ou êtes étroitement associé avec une PPE ?</div>
          <div className="pdf-form-colon">:</div>
          <div className="pdf-radio-group">
            <div className="pdf-checkbox-box">{data.ppeLien === 'OUI' ? 'X' : ''}</div> OUI
            <div className="pdf-checkbox-box" style={{ marginLeft: '15px' }}>{data.ppeLien === 'NON' ? 'X' : ''}</div> NON
          </div>
        </div>

        <p className="pdf-text-tiny blue-tiny">PPE : Personne qui exerce ou qui a cessé d’exercer depuis moins d’un an, des fonctions politiques, juridictionnelles ou administratives pour le compte de la France, d’un Etat étranger ou d’une organisation internationale, ainsi que leurs proches.</p>

        <h4>II.Recueil des besoins</h4>
        <p className="pdf-text-small">Les informations techniques relatives à votre entreprise (activités du bâtiment déclarées, antécédents d'assurance, expérience et chiffre d'affaires) ont été recueillies directement lors de notre entretien et saisies dans notre outil de simulation. Elles sont annexées au projet de devis joint.</p>
        
        <p className="pdf-text-small"><strong>Expression des priorités du client :</strong> Pour cette recherche de Responsabilité Civile Décennale, vos exigences prioritaires concernent (cocher les cases correspondantes) :</p>

        <div className="pdf-priorite-row">
          <div className="pdf-checkbox-box large">{data.prioriteCout ? 'X' : ''}</div>
          <p>Le coût : Recherche de la prime d'assurance la plus compétitive pour votre budget.</p>
        </div>
        <div className="pdf-priorite-row">
          <div className="pdf-checkbox-box large">{data.prioriteConformite ? 'X' : ''}</div>
          <p>La conformité / Rapidité : Obtention urgente d'une attestation conforme pour le démarrage immédiat de vos chantiers.</p>
        </div>
        <div className="pdf-priorite-row">
          <div className="pdf-checkbox-box large">{data.prioriteEtendue ? 'X' : ''}</div>
          <p>L'étendue des garanties : Besoin de plafonds de garantie élevés ou d'options spécifiques (ex: couverture de la sous-traitance, dommages en cours de chantier).</p>
        </div>

        <p className="pdf-text-small" style={{ marginTop: '15px' }}><strong>Montant maximal des chantiers envisagés :</strong></p>
        <ul className="pdf-list-small no-margin">
          <li>Le coût maximal par chantier (engagé sur un même site) ne dépassera pas : <strong>{data.montantMax}</strong> €<br/>(Information obligatoire pour valider les limites de votre future attestation).</li>
        </ul>

        <h4>III.Mandat d’étude et de placement</h4>
        <p className="pdf-text-small">Le client mandate ce jour, à titre exclusif, la société <strong>AMADIS COURTAGE</strong> pour mener les prestations d'analyse, de recherche de solutions d'assurance en Responsabilité Civile Décennale, ainsi que les démarches de résiliation de ses anciens contrats et de gestion administrative.</p>
        
        <p className="pdf-text-small" style={{ fontWeight: 'bold' }}>1. Objet et Nature de la Mission</p>
        <ul className="pdf-list-small">
          <li>Recherche et négociation exclusives : Étude approfondie du risque, vérification des antécédents et placement exclusif du dossier de <strong>Responsabilité Civile Décennale</strong> auprès des porteurs de risques (compagnies et grossistes).</li>
          <li>Mandat de résiliation : Prise en charge, gestion et envoi des demandes de résiliation auprès des assureurs actuels du client.</li>
          <li>Gestion administrative : Suivi du contrat, édition des attestations obligatoires et gestion des pièces justificatives.</li>
        </ul>

        <p className="pdf-text-small" style={{ fontWeight: 'bold' }}>2. Clause d'Exclusivité et Engagements du Client</p>
        <p className="pdf-text-small">Le client s'interdit, pendant toute la durée de la mission fixée à [30] jours à compter de la signature des présentes :</p>
        <ul className="pdf-list-small">
          <li>De mandater un autre intermédiaire en assurance (courtier ou agent) pour le même risque.</li>
          <li>De démarcher directement les compagnies d'assurances ou grossistes du marché.</li>
          <li>De s'approprier les projets, études ou solutions techniques présentés par <strong>AMADIS COURTAGE</strong> pour les souscrire par un autre canal.</li>
        </ul>

        <div className="pdf-footer">
          <p className="orange">AMADIS COURTAGE | <span className="black">25 rue de Ponthieu 75008 Paris | Site web : <span className="orange-light">www.amadiscourtage.fr</span> | E-mail : <span className="orange-light">gestion@amadiscourtage.fr</span></span></p>
          <p>TEL : +33 1 84 80 82 14 | RCS Paris B 934 550 633 | N°SIRET : 93455063300010 | Orias Nº : 24008492</p>
          <div className="pdf-page-num">Page 2/3</div>
        </div>
      </div>

      {/* PAGE 3 */}
      <div className="pdf-page">
        <div className="pdf-header">
          <div className="pdf-title-box dark-blue-bg">
            <h1>FORMALISATION DU CONSEIL RC DÉCENNALE</h1>
          </div>
          <img src="/logo_amadis.jpg" alt="Amadis Courtage" className="pdf-logo" />
        </div>

        <p className="pdf-text-small" style={{ fontWeight: 'bold', marginTop: '20px' }}>3. Conditions Financières</p>
        <ul className="pdf-list-small">
          <li><strong>Forfait d'honoraires</strong> de recherche et d'audit fixé à : ................... € HT (soit ................... € TTC)</li>
          <li><strong>Garantie d'exigibilité :</strong> Le client reconnaît que les honoraires forfaitaires indiqués ci-dessus sont <strong>non remboursables</strong> et intégralement dus dès la présentation d'une ou plusieurs solutions conformes, indépendamment de sa décision finale de souscrire ou non.</li>
          <li><strong>Rupture d'exclusivité :</strong> En cas de non-respect de la clause d'exclusivité par le client (souscription en direct ou via un tiers), les honoraires forfaitaires prévus seront immédiatement exigibles à titre de clause pénale forfaitaire pour le travail de recherche accompli.</li>
        </ul>

        <p className="pdf-text-small">En cochant la case de validation et en signant électroniquement ce document, je confirme mon accord exprès et sans réserve pour le présent Mandat d’étude et de placement exclusif, incluant les conditions financières, les clauses d'exclusivité et le caractère non remboursable des honoraires dus.</p>

        <h4>IV.Obligations de l'assuré et limites de responsabilité (Points Importants)</h4>
        <ul className="pdf-list-small">
          <li>Évolution du Chiffre d'Affaires et des effectifs : Le client reconnaît que le tarif de la proposition est calculé en fonction du chiffre d'affaires annuel et des effectifs déclarés. Le client s'engage à déclarer chaque année à AMADIS COURTAGE son nouveau chiffre d'affaires lors de la clôture du bilan, ainsi que l'effectif à jour de la société, afin de faire évoluer le contrat en conséquence.</li>
          <li>Respect de la nomenclature des activités : Concernant les activités qualifiées de « complémentaires de... » dans la nomenclature (FFSA / France Assureurs), le client est averti qu'en aucun cas ces activités listées ne doivent faire l'objet de lots de travaux isolés ou principaux. En cas de doute sur l'étendue des garanties d'une activité, le client s'engage à se renseigner au préalable auprès des services d'AMADIS COURTAGE.</li>
          <li>Absence de reprise du passé (Défaut d'assurance antérieur) : En cas de création de l'entreprise depuis plus d'un an sans assurance décennale obligatoire, le client s'engage expressément à ne pas faire de recours contre AMADIS COURTAGE ou l'assureur en cas de sinistre antérieur à la date de souscription. En aucun cas la responsabilité d'AMADIS COURTAGE ne pourra être engagée sans une demande écrite préalable du client visant à obtenir une « reprise du passé », et sous réserve de l'acceptation expresse et écrite de l'assureur.</li>
          <li>Valeur du document : Le client reconnaît que le présent document (Fiche de conseil / Mandat) ne constitue en aucun cas une attestation d'assurance décennale et ne permet pas de justifier de l'ouverture de garanties auprès de tiers ou sur un chantier.</li>
        </ul>

        <h4>V.Informations sur le(s) produit(s)</h4>
        <p className="pdf-text-small">Les informations sur le(s) produit(s) ont été délivrées par la remise de plaquettes, descriptifs ou fiches de présentation de(s) produit(s).</p>

        <h4>VI. Conseil et solution d’assurance</h4>
        <p className="pdf-text-small">Au vu des besoins que vous avez exprimés au terme du présent « diagnostic », nous vous proposons et recommandons de souscrire le(s) contrat(s)/garantie(s) suivant(s) :</p>
        
        <div className="pdf-value-box">{data.contratPropose || ' '}</div>

        <div className="pdf-form-row" style={{ marginTop: '10px' }}>
          <div className="pdf-form-label-short" style={{ width: '150px' }}>Le(s) motif(s) de ce choix :</div>
          <div className="pdf-value-box flex-grow">{data.motifChoix || ' '}</div>
        </div>

        <p className="pdf-text-small" style={{ marginTop: '15px' }}>Nous attirons votre attention sur l’importance de la sincérité des réponses apportées aux questions posées. Une fausse déclaration peut conduire à l’annulation de votre contrat d’assurance et à l’absence de couverture en cas de sinistre.</p>

        <div className="pdf-priorite-row" style={{ marginTop: '15px' }}>
          <div className="pdf-checkbox-box large">{data.checkConnaissance ? 'X' : ''}</div>
          <p>Je reconnais avoir pris connaissance de ce document ainsi que du document d’information sur le produit d’assurance avant l’établissement du contrat.</p>
        </div>
        <div className="pdf-priorite-row">
          <div className="pdf-checkbox-box large">{data.checkInfos ? 'X' : ''}</div>
          <p>Je souhaite être informé par courrier électronique, sms et/ou téléphone des actualités et offres des partenaires de AMADIS COURTAGE.</p>
        </div>
        <div className="pdf-priorite-row">
          <div className="pdf-checkbox-box large">{data.checkRefus ? 'X' : ''}</div>
          <p>J’ai parfaitement conscience que le refus de communiquer les informations sollicitées m’expose à recevoir un conseil inadapté à mes besoins et exigences.</p>
        </div>

        <div className="pdf-signature-section">
          <div className="pdf-signature-title">Signature</div>
          <p>Fait à Paris, le : <strong style={{ marginLeft: '10px' }}>{today}</strong></p>
          
          <div className="pdf-signatures-boxes">
            <div className="pdf-sig-box">
              <p><strong>Le client :</strong></p>
              <div className="pdf-sig-image-container">
                {/* Espace pour la signature du client */}
              </div>
            </div>
            <div className="pdf-sig-box">
              <p><strong>Le courtier :</strong></p>
              <div className="pdf-sig-image-container">
                {/* Espace pour la signature du courtier si nécessaire */}
              </div>
            </div>
          </div>
        </div>

        <div className="pdf-footer">
          <p className="orange">AMADIS COURTAGE | <span className="black">25 rue de Ponthieu 75008 Paris | Site web : <span className="orange-light">www.amadiscourtage.fr</span> | E-mail : <span className="orange-light">gestion@amadiscourtage.fr</span></span></p>
          <p>TEL : +33 1 84 80 82 14 | RCS Paris B 934 550 633 | N°SIRET : 93455063300010 | Orias Nº : 24008492</p>
          <div className="pdf-page-num">Page 3/3</div>
        </div>
      </div>
    </div>
  );
});

export default DocumentTemplate;
