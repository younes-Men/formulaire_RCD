const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add errors state
content = content.replace(
  "  const [isGenerating, setIsGenerating] = useState(false);",
  "  const [isGenerating, setIsGenerating] = useState(false);\n  const [errors, setErrors] = useState({});"
);

// Clear errors on change
content = content.replace(
  "    setFormData((prev) => ({",
  "    setErrors((prev) => ({ ...prev, [name]: false }));\n    if (type === 'checkbox') setErrors((prev) => ({ ...prev, priorite: false }));\n    setFormData((prev) => ({"
);

// Update validateForm
const validateFormRegex = /  const validateForm = \(\) => \{[\s\S]*?return true;\n  \};/;
const newValidateForm = `  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    
    const requiredFields = [
      'raisonSociale', 'nomDirigeant', 'formeJuridique',
      'adresse', 'ville', 'codePostal', 'telephone', 'email',
      'montantMax', 'honorairesHT', 'honorairesTTC',
      'contratPropose', 'motifChoix'
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = true;
        isValid = false;
      }
    }

    if (!formData.prioriteCout && !formData.prioriteConformite && !formData.prioriteEtendue) {
      newErrors.priorite = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };`;

content = content.replace(validateFormRegex, newValidateForm);

// Add error messages below inputs
const requiredFields = [
  'raisonSociale', 'nomDirigeant', 'formeJuridique',
  'adresse', 'codePostal', 'ville', 'telephone', 'email',
  'montantMax', 'honorairesHT', 'honorairesTTC',
  'contratPropose', 'motifChoix'
];

for (let field of requiredFields) {
  const regex = new RegExp(`(<input type="(text|number)" name="${field}"[^>]*>)`);
  content = content.replace(regex, `$1\n          {errors.${field} && <span style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block'}}>Ce champ est obligatoire</span>}`);
}

// For priorite
const prioriteRegex = /(<label className="form-label" style={{ marginBottom: '1rem' }}>Priorités du client :<\/label>)/;
content = content.replace(prioriteRegex, `$1\n          {errors.priorite && <span style={{color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block'}}>Veuillez sélectionner au moins une priorité</span>}`);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated App.jsx successfully.");
