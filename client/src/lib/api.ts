// Typed fetch helper for the Nutrition Expert System API

const API_BASE = 'http://localhost:3001/api';

export type Gender = 'male' | 'female';
export type Activity = 'sedentary' | 'light' | 'active' | 'athlete';
export type Goal = 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'maintain';
export type Symptom = 'fatigue' | 'constipation' | 'headache' | 'muscle_cramps' | 'poor_concentration' | 'bloating' | 'acid_reflux' | 'acne' | 'joint_pain' | 'hair_loss';
export type Allergy = 'dairy' | 'nuts' | 'eggs' | 'gluten' | 'shellfish';

export interface DietRequest {
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  activity: Activity;
  goal: Goal;
  allergies: Allergy[];
}

export interface SymptomRequest {
  symptoms: Symptom[];
  allergies: Allergy[];
}

export interface ApiResponse {
  result: string;
}

export const getDietPlan = async (data: DietRequest): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/diet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch diet plan');
    }

    const json: ApiResponse = await response.json();
    return json.result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getSymptomAdvice = async (data: SymptomRequest): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/symptoms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch symptom advice');
    }

    const json: ApiResponse = await response.json();
    return json.result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
