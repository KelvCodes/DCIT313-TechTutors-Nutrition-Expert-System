import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDietPlan, getSymptomAdvice, type Goal, type Symptom, type Allergy, type Activity, type Gender } from '../lib/api';
import {
  IoPersonOutline,
  IoFitnessOutline,
  IoMedicalOutline,
  IoLeafOutline,
  IoCheckmarkCircle,
  IoAlertCircleOutline,
  IoArrowBack,
  IoSparkles,
  IoRestaurantOutline,
  IoHeartOutline
} from 'react-icons/io5';

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'selection' | 'diet' | 'symptoms';

interface FormData {
  age: string;
  gender: Gender | '';
  weight: string;
  height: string;
  activity: Activity | '';
  goal: Goal | '';
  symptoms: Symptom[];
  allergies: Allergy[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ACTIVITIES: { value: Activity; label: string; desc: string }[] = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
  { value: 'light',     label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
  { value: 'active',    label: 'Active', desc: 'Moderate exercise 3-5 days/week' },
  { value: 'athlete',   label: 'Athlete', desc: 'Hard exercise 6-7 days/week' },
];

const GOALS: { value: Goal; label: string; desc: string; emoji: string }[] = [
  { value: 'weight_loss',  label: 'Weight Loss',            desc: 'Reduce body fat healthily',       emoji: '🔥' },
  { value: 'weight_gain',  label: 'Weight Gain',            desc: 'Build healthy mass',               emoji: '💪' },
  { value: 'muscle_gain',  label: 'Muscle Gain',            desc: 'Increase lean muscle tissue',      emoji: '🏋️' },
  { value: 'maintain',     label: 'Maintain Weight',        desc: 'Stay at current healthy weight',   emoji: '⚖️' },
];

const SYMPTOMS: { value: Symptom; label: string; emoji: string }[] = [
  { value: 'fatigue',            label: 'Fatigue',            emoji: '😴' },
  { value: 'constipation',       label: 'Constipation',       emoji: '😣' },
  { value: 'headache',           label: 'Headache',           emoji: '🤕' },
  { value: 'muscle_cramps',      label: 'Muscle Cramps',      emoji: '⚡' },
  { value: 'poor_concentration', label: 'Poor Concentration', emoji: '🧠' },
  { value: 'bloating',           label: 'Bloating/Gas',       emoji: '🎈' },
  { value: 'acid_reflux',        label: 'Acid Reflux',        emoji: '🔥' },
  { value: 'acne',               label: 'Skin Breakouts',     emoji: '🧖' },
  { value: 'joint_pain',         label: 'Joint Pain',         emoji: '🦴' },
  { value: 'hair_loss',          label: 'Hair Thinning',      emoji: '💇' },
];

const ALLERGIES: { value: Allergy; label: string; emoji: string }[] = [
  { value: 'dairy',     label: 'Dairy',     emoji: '🥛' },
  { value: 'nuts',      label: 'Nuts',      emoji: '🥜' },
  { value: 'eggs',      label: 'Eggs',      emoji: '🥚' },
  { value: 'gluten',    label: 'Gluten',    emoji: '🌾' },
  { value: 'shellfish', label: 'Shellfish', emoji: '🦐' },
];

const DIET_STEPS = [
  { label: 'Profile',   icon: <IoPersonOutline /> },
  { label: 'Goal',      icon: <IoFitnessOutline /> },
  { label: 'Allergies', icon: <IoLeafOutline /> },
];

const SYMPTOM_STEPS = [
  { label: 'Symptoms',  icon: <IoMedicalOutline /> },
  { label: 'Allergies', icon: <IoLeafOutline /> },
];

// ─── Step Indicator ───────────────────────────────────────────────────────────

const StepIndicator = ({ current, steps }: { current: number, steps: { label: string, icon: JSX.Element }[] }) => (
  <div className="flex items-center justify-center gap-0 mb-10">
    {steps.map((step, i) => {
      const done    = i < current;
      const active  = i === current;
      return (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all duration-300
              ${done   ? 'bg-sea-blue border-sea-blue text-white shadow-lg shadow-sea-blue/30'  : ''}
              ${active ? 'bg-white border-sea-blue text-sea-blue shadow-lg shadow-sea-blue/20 scale-110' : ''}
              ${!done && !active ? 'bg-white border-slate-200 text-slate-400' : ''}
            `}>
              {done ? <IoCheckmarkCircle className="text-xl" /> : step.icon}
            </div>
            <span className={`text-[10px] font-semibold uppercase tracking-wider hidden sm:block
              ${active ? 'text-sea-blue' : done ? 'text-slate-500' : 'text-slate-300'}
            `}>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-[2px] w-12 sm:w-16 mx-1 transition-all duration-500 ${i < current ? 'bg-sea-blue' : 'bg-slate-200'}`} />
          )}
        </div>
      );
    })}
  </div>
);

// ─── Results Display ──────────────────────────────────────────────────────────

const ResultDisplay = ({ text, onReset, mode }: { text: string; onReset: () => void, mode: Mode }) => {
  const sections = text.split(/={10,}/).map(s => s.trim()).filter(Boolean);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-sea rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg shadow-sea-blue/30">
          <IoSparkles />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          {mode === 'diet' ? 'Your Balanced Diet Plan' : 'Clinical Symptom Analysis'}
        </h2>
        <p className="text-slate-500 text-sm mt-1">Generated by the Prolog Expert System</p>
      </div>

      {sections.map((section, i) => {
        const lines = section.split('\n').map(l => l.trim()).filter(Boolean);
        if (!lines.length) return null;
        const title = lines[0];
        const body  = lines.slice(1);
        return (
          <div key={i} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="px-5 py-3 bg-gradient-to-r from-sea-blue/5 to-sea-blue/10 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{title}</h3>
            </div>
            <div className="px-5 py-4 space-y-2">
              {body.map((line, j) => {
                // If there's a colon, make the part before the colon bold for readability
                const colonIndex = line.indexOf(':');
                const isListItem = line.startsWith('-') || line.startsWith('*');
                
                if (colonIndex > 0 && colonIndex < 40) {
                  const label = line.substring(0, colonIndex + 1);
                  const rest = line.substring(colonIndex + 1);
                  return (
                    <p key={j} className={`text-sm text-slate-700 leading-relaxed font-medium ${isListItem ? 'pl-4' : ''}`}>
                      <span className="font-extrabold text-slate-900">{label}</span>{rest}
                    </p>
                  );
                }

                return (
                  <p key={j} className={`text-sm text-slate-700 leading-relaxed font-medium ${isListItem ? 'pl-4' : ''}`}>
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 mt-8">
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Mandatory Medical Disclaimer:</strong> This system provides evidence-based nutrition estimates. It does NOT diagnose diseases or prescribe treatments. Always consult a healthcare professional for persistent symptoms or before making major dietary changes.
        </p>
      </div>

      <button
        onClick={onReset}
        className="cursor-pointer w-full py-3.5 mt-4 rounded-2xl border-2 border-sea-blue/30 text-sea-blue font-semibold text-sm hover:bg-sea-blue hover:text-white transition-all"
      >
        Start a New Consultation
      </button>
    </div>
  );
};

// ─── Main Consult Page ────────────────────────────────────────────────────────

const ConsultPage = () => {
  const navigate = useNavigate();
  const [mode, setMode]       = useState<Mode>('selection');
  const [step, setStep]       = useState(0);
  const [form, setForm]       = useState<FormData>({ age: '', gender: 'male' as any, weight: '', height: '', activity: 'sedentary' as any, goal: '', symptoms: [], allergies: [] });
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<string | null>(null);
  const [error, setError]     = useState<string | null>(null);

  const toggle = <T extends string>(list: T[], val: T): T[] =>
    list.includes(val) ? list.filter(x => x !== val) : [...list, val];

  const canNextDiet = () => {
    if (step === 0) return form.age !== '' && form.weight !== '' && form.height !== '' &&
                           form.gender !== '' && form.activity !== '' as any &&
                           Number(form.age) > 0 && Number(form.weight) > 0 && Number(form.height) > 0;
    if (step === 1) return form.goal !== '';
    return true; // allergies are optional
  };

  const canNextSymptom = () => {
    if (step === 0) return form.symptoms.length > 0;
    return true; // allergies are optional
  };

  const handleDietSubmit = async () => {
    setLoading(true); setError(null);
    try {
      const res = await getDietPlan({
        age:       Number(form.age),
        gender:    form.gender as any,
        weight:    Number(form.weight),
        height:    Number(form.height),
        activity:  form.activity as any,
        goal:      form.goal as Goal,
        allergies: form.allergies,
      });
      setResult(res);
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Something went wrong'); } 
    finally { setLoading(false); }
  };

  const handleSymptomSubmit = async () => {
    setLoading(true); setError(null);
    try {
      const res = await getSymptomAdvice({
        symptoms:  form.symptoms,
        allergies: form.allergies,
      });
      setResult(res);
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Something went wrong'); } 
    finally { setLoading(false); }
  };

  const reset = () => {
    setMode('selection');
    setStep(0);
    setForm({ age: '', gender: 'male' as any, weight: '', height: '', activity: 'sedentary' as any, goal: '', symptoms: [], allergies: [] });
    setResult(null);
    setError(null);
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sea-blue focus:ring-2 focus:ring-sea-blue/20 outline-none transition-all text-slate-800 placeholder-slate-400 text-sm bg-white";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex flex-col">
      {/* Top bar */}
      <header className="px-4 sm:px-8 py-4 flex items-center gap-3 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <button onClick={() => mode === 'selection' ? navigate('/') : setMode('selection')} className="flex items-center gap-2 text-slate-500 hover:text-sea-blue transition-colors text-sm font-medium">
          <IoArrowBack /> {mode === 'selection' ? 'Back to Home' : 'Change Mode'}
        </button>
        <span className="text-slate-200">|</span>
        <span className="text-xl font-bold bg-gradient-sea bg-clip-text text-transparent">Nutrix-AI</span>
        <span className="ml-auto text-xs text-slate-400 hidden sm:block">
            {mode === 'selection' ? 'Select Mode' : mode === 'diet' ? 'Preventive Health Mode' : 'Support Mode'}
        </span>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-2xl">

          {!result ? (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
              
              {/* ── MODE SELECTION ── */}
              {mode === 'selection' && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900">How can we help today?</h2>
                    <p className="text-slate-500 mt-2">Choose the type of consultation you need</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <button 
                      onClick={() => { setMode('diet'); setStep(0); }}
                      className="cursor-pointer group flex flex-col items-start p-6 sm:p-8 rounded-3xl border-2 border-slate-200 hover:border-sea-blue bg-white hover:bg-sea-blue/5 transition-all text-left shadow-sm hover:shadow-lg hover:-translate-y-1">
                      <div className="w-14 h-14 bg-sea-blue/10 text-sea-blue rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                        <IoRestaurantOutline />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Balanced Diet Plan</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Preventive health mode. Get a personalized meal plan and macro split based on your biometrics and goals.</p>
                    </button>

                    <button 
                      onClick={() => { setMode('symptoms'); setStep(0); }}
                      className="cursor-pointer group flex flex-col items-start p-6 sm:p-8 rounded-3xl border-2 border-slate-200 hover:border-sea-blue bg-white hover:bg-sea-blue/5 transition-all text-left shadow-sm hover:shadow-lg hover:-translate-y-1">
                      <div className="w-14 h-14 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                        <IoHeartOutline />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Symptom Guidance</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Support mode. Input your current symptoms and receive purely clinical, evidence-based nutritional advice.</p>
                    </button>
                  </div>
                </div>
              )}

              {/* ── DIET MODE FLOW ── */}
              {mode === 'diet' && !loading && (
                <>
                  <StepIndicator current={step} steps={DIET_STEPS} />

                  {/* Profile Step */}
                  {step === 0 && (
                     <div className="space-y-5 animate-fade-in-up">
                       <div className="text-center mb-6">
                         <h2 className="text-2xl font-extrabold text-slate-900">Patient Profile</h2>
                         <p className="text-slate-500 text-sm mt-1">Basic biometrics for BMR calculation</p>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Gender</label>
                           <select className={inputCls} value={form.gender as any} onChange={e => setForm(f => ({ ...f, gender: e.target.value as any }))}>
                             <option value="male">Male</option>
                             <option value="female">Female</option>
                           </select>
                         </div>
                         <div>
                           <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Age (years)</label>
                           <input type="number" min="1" max="120" placeholder="e.g. 25" className={inputCls}
                             value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
                         </div>
                       </div>
     
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Weight (kg)</label>
                           <input type="number" min="1" placeholder="e.g. 70" className={inputCls}
                             value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} />
                         </div>
                         <div>
                           <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Height (m)</label>
                           <input type="number" min="0.5" max="3" step="0.01" placeholder="e.g. 1.75" className={inputCls}
                             value={form.height} onChange={e => setForm(f => ({ ...f, height: e.target.value }))} />
                         </div>
                       </div>
     
                       <div>
                         <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Activity Level</label>
                         <select className={inputCls} value={form.activity as any} onChange={e => setForm(f => ({ ...f, activity: e.target.value as any }))}>
                           {ACTIVITIES.map(a => (
                             <option key={a.value} value={a.value}>{a.label} — {a.desc}</option>
                           ))}
                         </select>
                       </div>
                     </div>
                  )}

                  {/* Goal Step */}
                  {step === 1 && (
                     <div className="animate-fade-in-up">
                     <div className="text-center mb-6">
                       <h2 className="text-2xl font-extrabold text-slate-900">What's your goal?</h2>
                       <p className="text-slate-500 text-sm mt-1">Choose the primary objective for your diet</p>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {GOALS.map(g => (
                         <button key={g.value}
                           onClick={() => setForm(f => ({ ...f, goal: g.value }))}
                           className={`cursor-pointer p-4 rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5
                             ${form.goal === g.value ? 'border-sea-blue bg-sea-blue/5 shadow-md shadow-sea-blue/10' : 'border-slate-200 hover:border-sea-blue/40'}`}>
                           <span className="text-2xl block mb-2">{g.emoji}</span>
                           <p className="font-bold text-slate-900 text-sm">{g.label}</p>
                           <p className="text-xs text-slate-500 mt-0.5">{g.desc}</p>
                           {form.goal === g.value && (
                             <IoCheckmarkCircle className="text-sea-blue text-xl mt-2" />
                           )}
                         </button>
                       ))}
                     </div>
                   </div>
                  )}

                  {/* Allergies Step */}
                  {step === 2 && (
                    <div className="animate-fade-in-up">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-extrabold text-slate-900">Any food restrictions?</h2>
                      <p className="text-slate-500 text-sm mt-1">Select any allergies or intolerances</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ALLERGIES.map(a => (
                        <button key={a.value}
                          onClick={() => setForm(f => ({ ...f, allergies: toggle(f.allergies, a.value) }))}
                          className={`cursor-pointer p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all hover:-translate-y-0.5
                            ${form.allergies.includes(a.value) ? 'border-sea-blue bg-sea-blue/5 shadow-md shadow-sea-blue/10' : 'border-slate-200 hover:border-sea-blue/40'}`}>
                          <span className="text-2xl">{a.emoji}</span>
                          <p className="font-semibold text-slate-900 text-sm">{a.label}</p>
                          {form.allergies.includes(a.value) && (
                            <IoCheckmarkCircle className="text-sea-blue text-xl ml-auto flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  )}

                  {/* Diet Navigation */}
                  <div className="flex gap-3 mt-8">
                    {step > 0 && (
                      <button onClick={() => setStep(s => s - 1)}
                        className="cursor-pointer flex-1 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-sea-blue hover:text-sea-blue transition-all">
                        ← Back
                      </button>
                    )}
                    {step < DIET_STEPS.length - 1 ? (
                      <button onClick={() => setStep(s => s + 1)} disabled={!canNextDiet()}
                        className="cursor-pointer flex-[2] py-3.5 rounded-2xl bg-gradient-sea text-white font-bold text-sm shadow-lg shadow-sea-blue/30 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:translate-y-0 disabled:cursor-not-allowed">
                        Continue →
                      </button>
                    ) : (
                      <button onClick={handleDietSubmit}
                        className="cursor-pointer flex-[2] py-3.5 rounded-2xl bg-gradient-sea text-white font-bold text-sm shadow-lg shadow-sea-blue/30 hover:-translate-y-0.5 transition-all">
                        ✨ Generate Diet
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* ── SYMPTOMS MODE FLOW ── */}
              {mode === 'symptoms' && !loading && (
                <>
                  <StepIndicator current={step} steps={SYMPTOM_STEPS} />

                  {/* Symptoms Step */}
                  {step === 0 && (
                    <div className="animate-fade-in-up">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-extrabold text-slate-900">What are your symptoms?</h2>
                        <p className="text-slate-500 text-sm mt-1">Select all that apply for clinical analysis</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {SYMPTOMS.map(s => (
                          <button key={s.value}
                            onClick={() => setForm(f => ({ ...f, symptoms: toggle(f.symptoms, s.value) }))}
                            className={`cursor-pointer p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all hover:-translate-y-0.5
                              ${form.symptoms.includes(s.value) ? 'border-sea-blue bg-sea-blue/5 shadow-md shadow-sea-blue/10' : 'border-slate-200 hover:border-sea-blue/40'}`}>
                            <span className="text-2xl">{s.emoji}</span>
                            <div>
                              <p className="font-semibold text-slate-900 text-sm">{s.label}</p>
                            </div>
                            {form.symptoms.includes(s.value) && (
                              <IoCheckmarkCircle className="text-sea-blue text-xl ml-auto flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Allergies Step */}
                  {step === 1 && (
                    <div className="animate-fade-in-up">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-extrabold text-slate-900">Any food restrictions?</h2>
                      <p className="text-slate-500 text-sm mt-1">We need this to ensure our recommendations are safe</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ALLERGIES.map(a => (
                        <button key={a.value}
                          onClick={() => setForm(f => ({ ...f, allergies: toggle(f.allergies, a.value) }))}
                          className={`cursor-pointer p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all hover:-translate-y-0.5
                            ${form.allergies.includes(a.value) ? 'border-sea-blue bg-sea-blue/5 shadow-md shadow-sea-blue/10' : 'border-slate-200 hover:border-sea-blue/40'}`}>
                          <span className="text-2xl">{a.emoji}</span>
                          <p className="font-semibold text-slate-900 text-sm">{a.label}</p>
                          {form.allergies.includes(a.value) && (
                            <IoCheckmarkCircle className="text-sea-blue text-xl ml-auto flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  )}

                  {/* Symptom Navigation */}
                  <div className="flex gap-3 mt-8">
                    {step > 0 && (
                      <button onClick={() => setStep(s => s - 1)}
                        className="cursor-pointer flex-1 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-sea-blue hover:text-sea-blue transition-all">
                        ← Back
                      </button>
                    )}
                    {step < SYMPTOM_STEPS.length - 1 ? (
                      <button onClick={() => setStep(s => s + 1)} disabled={!canNextSymptom()}
                        className="cursor-pointer flex-[2] py-3.5 rounded-2xl bg-gradient-sea text-white font-bold text-sm shadow-lg shadow-sea-blue/30 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:translate-y-0 disabled:cursor-not-allowed">
                        Continue →
                      </button>
                    ) : (
                      <button onClick={handleSymptomSubmit}
                        className="cursor-pointer flex-[2] py-3.5 rounded-2xl bg-gradient-sea text-white font-bold text-sm shadow-lg shadow-sea-blue/30 hover:-translate-y-0.5 transition-all">
                        🩺 Analyze Symptoms
                      </button>
                    )}
                  </div>
                </>
              )}


              {/* Loading state */}
              {loading && (
                <div className="text-center py-16 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-gradient-sea mx-auto mb-6 flex items-center justify-center shadow-lg shadow-sea-blue/30 animate-pulse">
                    <IoSparkles className="text-white text-2xl" />
                  </div>
                  <p className="text-slate-700 font-bold text-lg">Consulting the Expert System…</p>
                  <p className="text-slate-400 text-sm mt-1">Prolog is reasoning about your profile</p>
                  <div className="flex justify-center gap-1.5 mt-6">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <span key={i} className="w-2 h-2 bg-sea-blue rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Error state */}
              {error && !loading && (
                <div className="mt-4 p-4 rounded-2xl border border-red-200 bg-red-50 flex items-start gap-3">
                  <IoAlertCircleOutline className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-700 font-semibold text-sm">Something went wrong</p>
                    <p className="text-red-500 text-xs mt-0.5">{error}</p>
                    <p className="text-red-400 text-xs mt-1">Make sure the server is running on port 3001 and SWI-Prolog is installed.</p>
                  </div>
                  <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">×</button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
              <ResultDisplay text={result} onReset={reset} mode={mode} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ConsultPage;
