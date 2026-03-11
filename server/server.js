const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Path to the Prolog knowledge base
const PROLOG_FILE = path.join(__dirname, '..', 'diet_and_nutrition_expert_system.pl');

// Helper function to safely run Prolog queries
const runPrologQuery = (query, res) => {
  console.log('--- EXECUTING PROLOG QUERY ---');
  console.log(query);

  const prolog = spawn('swipl', [
    '-l', PROLOG_FILE,
    '-g', query,
    '-g', 'halt'
  ]);

  let output = '';
  let errorOutput = '';

  prolog.stdout.on('data', (data) => { output += data.toString(); });
  prolog.stderr.on('data', (data) => { errorOutput += data.toString(); });

  prolog.on('close', (code) => {
    if (code !== 0 && output.trim() === '') {
      console.error('--- PROLOG ERROR ---');
      console.error('Query:', query);
      console.error('Error Output:', errorOutput);
      return res.status(500).json({ error: 'Expert system failed to run', details: errorOutput });
    }
    res.json({ result: output.trim() });
  });
};

const formatList = (arr) => `[${(arr || []).map(item => `'${item}'`).join(',')}]`;

// -------------------------------------------------------
// POST /api/diet (Balanced Diet Generator)
// -------------------------------------------------------
app.post('/api/diet', (req, res) => {
    try {
        const { age, gender, weight, height, activity, goal, allergies } = req.body;

        if (!age || !gender || !weight || !height || !activity || !goal) {
            return res.status(400).json({ error: 'Missing required profile information.' });
        }

        const allergiesList = formatList(allergies);
        const query = `generate_diet(${age}, ${gender}, ${weight}, ${height}, ${activity}, ${goal}, ${allergiesList}).`;
        
        runPrologQuery(query, res);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// -------------------------------------------------------
// POST /api/symptoms (Symptom-Based Guidance)
// -------------------------------------------------------
app.post('/api/symptoms', (req, res) => {
    try {
        const { symptoms, allergies } = req.body;

        if (!symptoms || symptoms.length === 0) {
            return res.status(400).json({ error: 'At least one symptom is required.' });
        }

        const symptomsList = formatList(symptoms);
        const allergiesList = formatList(allergies);
        const query = `analyze_symptoms(${symptomsList}, ${allergiesList}).`;
        
        runPrologQuery(query, res);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// -------------------------------------------------------
// GET /api/health  — quick sanity check
// -------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Nutrition Expert System API is running' });
});

app.listen(PORT, () => {
  console.log(`\n  ✅ Server running at http://localhost:${PORT}`);
  console.log(`  📋 POST /api/recommend   — get nutrition advice`);
  console.log(`  ❤️  GET  /api/health      — server health check\n`);
});
