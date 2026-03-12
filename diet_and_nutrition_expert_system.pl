% =====================================================
% INTERACTIVE DIET & NUTRITION EXPERT SYSTEM
% DCIT 313 - Artificial Intelligence
% =====================================================

% =====================================================
% MAIN PROGRAM - START HERE
% =====================================================

% Main predicate to start the program
start :-
    writeln('============================================='),
    writeln('   DIET & NUTRITION EXPERT SYSTEM'),
    writeln('============================================='),
    writeln('Welcome! This system will provide personalized'),
    writeln('nutrition advice based on your information.'),
    writeln(''),
    collect_user_info,
    writeln(''),
    writeln('Thank you! Calculating your recommendations...'),
    writeln(''),
    generate_recommendations,
    writeln(''),
    show_disclaimer.

% =====================================================
% COLLECT USER INFORMATION
% =====================================================

collect_user_info :-
    % Clear any previous dynamic facts
    retractall(user_age(_)),
    retractall(user_weight(_)),
    retractall(user_height(_)),
    retractall(user_goal(_)),
    retractall(user_symptom(_)),
    retractall(user_allergy(_)),
    
    % Collect all inputs
    get_age,
    get_weight,
    get_height,
    get_goal,
    get_symptoms,
    get_allergies.

% Get age
get_age :-
    writeln('---------------------------------------------'),
    writeln('Please enter your details:'),
    write('Age (years): '),
    flush_output,
    read_line(Input),
    atom_number(Input, Age),
    (Age > 0 -> 
        assert(user_age(Age)),
        writeln('')
    ;
        writeln('Invalid age. Please try again.'),
        get_age
    ).

% Get weight
get_weight :-
    write('Weight (kg): '),
    flush_output,
    read_line(Input),
    atom_number(Input, Weight),
    (Weight > 0 -> 
        assert(user_weight(Weight)),
        writeln('')
    ;
        writeln('Invalid weight. Please try again.'),
        get_weight
    ).

% Get height
get_height :-
    write('Height (meters, e.g., 1.75): '),
    flush_output,
    read_line(Input),
    atom_number(Input, Height),
    (Height > 0 -> 
        assert(user_height(Height)),
        writeln('')
    ;
        writeln('Invalid height. Please try again.'),
        get_height
    ).

% Get health goal
get_goal :-
    writeln('---------------------------------------------'),
    writeln('Select your health goal:'),
    writeln('  1 - Weight Loss'),
    writeln('  2 - Weight Gain'),
    writeln('  3 - Muscle Gain'),
    writeln('  4 - Maintain Current Weight'),
    write('Enter choice (1-4): '),
    flush_output,
    read_line(Input),
    atom_number(Input, Choice),
    (goal_from_choice(Choice, Goal) ->
        assert(user_goal(Goal)),
        writeln('')
    ;
        writeln('Invalid choice. Please enter 1, 2, 3, or 4.'),
        get_goal
    ).

goal_from_choice(1, weight_loss).
goal_from_choice(2, weight_gain).
goal_from_choice(3, muscle_gain).
goal_from_choice(4, maintain).

% Get symptoms (multiple selection)
get_symptoms :-
    writeln('---------------------------------------------'),
    writeln('Do you have any symptoms? (Enter numbers, separated by commas)'),
    writeln('  0 - None'),
    writeln('  1 - Fatigue'),
    writeln('  2 - Constipation'),
    writeln('  3 - Headache'),
    writeln('  4 - Muscle Cramps'),
    writeln('  5 - Poor Concentration'),
    write('Enter choices (e.g., 1,3,4 or 0 for none): '),
    flush_output,
    read_line(Input),
    process_symptom_choices(Input).

process_symptom_choices(Input) :-
    (Input = "0" ->
        writeln('No symptoms selected.'),
        writeln('')
    ;
        split_string(Input, ",", " ", Numbers),
        maplist(atom_number, Numbers, Choices),
        maplist(assert_symptom, Choices)
    ).

assert_symptom(1) :- assert(user_symptom(fatigue)).
assert_symptom(2) :- assert(user_symptom(constipation)).
assert_symptom(3) :- assert(user_symptom(headache)).
assert_symptom(4) :- assert(user_symptom(muscle_cramps)).
assert_symptom(5) :- assert(user_symptom(poor_concentration)).
assert_symptom(_).

% Get allergies (multiple selection)
get_allergies :-
    writeln('---------------------------------------------'),
    writeln('Do you have any allergies/food restrictions? (Enter numbers, separated by commas)'),
    writeln('  0 - None'),
    writeln('  1 - Dairy'),
    writeln('  2 - Nuts'),
    writeln('  3 - Eggs'),
    writeln('  4 - Gluten'),
    writeln('  5 - Shellfish'),
    write('Enter choices (e.g., 1,2,4 or 0 for none): '),
    flush_output,
    read_line(Input),
    process_allergy_choices(Input).

process_allergy_choices(Input) :-
    (Input = "0" ->
        writeln('No allergies selected.'),
        writeln('')
    ;
        split_string(Input, ",", " ", Numbers),
        maplist(atom_number, Numbers, Choices),
        maplist(assert_allergy, Choices)
    ).

assert_allergy(1) :- assert(user_allergy(dairy)).
assert_allergy(2) :- assert(user_allergy(nuts)).
assert_allergy(3) :- assert(user_allergy(eggs)).
assert_allergy(4) :- assert(user_allergy(gluten)).
assert_allergy(5) :- assert(user_allergy(shellfish)).
assert_allergy(_).

% =====================================================
% GENERATE RECOMMENDATIONS
% =====================================================

generate_recommendations :-
    user_age(Age),
    user_weight(Weight),
    user_height(Height),
    user_goal(Goal),
    
    % Collect symptoms and allergies
    findall(S, user_symptom(S), Symptoms),
    findall(A, user_allergy(A), Allergies),
    
    % Provide defaults for terminal mode
    calculate_and_display(Age, male, Weight, Height, sedentary, Goal, Symptoms, Allergies).

calculate_and_display(Age, Gender, Weight, Height, Activity, Goal, Symptoms, Allergies) :-
    % Calculate BMI
    calculate_bmi(Weight, Height, BMI),
    classify_bmi(Age, BMI, BMICategory),
    
    % Calculate BMR & TDEE (Clinical Formulas)
    calculate_bmr(Gender, Weight, Height, Age, BMR),
    calculate_tdee(BMR, Activity, TDEE),
    calculate_target_calories(TDEE, Goal, TargetCals),
    
    % Calculate Macronutrients (40/30/30 split)
    Carbs is round((TargetCals * 0.40) / 4),
    Protein is round((TargetCals * 0.30) / 4),
    Fats is round((TargetCals * 0.30) / 9),
    
    % Display results
    writeln('============================================='),
    writeln('         CLINICAL NUTRITION REPORT'),
    writeln('============================================='),
    format('Patient Profile: ~w years | ~w | ~w kg | ~w m~n', [Age, Gender, Weight, Height]),
    format('Activity Level: ~w | Primary Goal: ~w~n', [Activity, Goal]),
    format('BMI: ~2f (~w)~n', [BMI, BMICategory]),
    writeln(''),
    
    % Daily Nutritional Targets
    writeln('DAILY NUTRITIONAL TARGETS:'),
    format('- Basal Metabolic Rate (BMR): ~0f kcal/day~n', [BMR]),
    format('- Total Daily Energy Exp. (TDEE): ~0f kcal/day~n', [TDEE]),
    format('- Target Daily Intake: ~0f kcal/day~n', [TargetCals]),
    writeln('- Recommended Macronutrient Split:'),
    format('  * Carbohydrates (40%): ~w g~n', [Carbs]),
    format('  * Protein (30%): ~w g~n', [Protein]),
    format('  * Fats (30%): ~w g~n', [Fats]),
    writeln(''),
    
    % Goal advice
    writeln('GOAL-BASED MEDICAL ADVICE:'),
    advice_for_goal(Goal, GoalAdvice),
    print_list(GoalAdvice),
    writeln(''),
    
    % Symptom advice
    (Symptoms \= [] ->
        writeln('SYMPTOM-BASED CLINICAL GUIDANCE:'),
        process_symptoms(Symptoms, Allergies)
    ;
        writeln('No symptoms reported. Maintaining standard balanced diet recommended.')
    ),
    writeln(''),
    
    % General recommendations
    writeln('GENERAL RECOMMENDATIONS:'),
    general_recommendations(Age, Allergies),
    writeln('').

% Calculate BMI (Fixed 0.00 Bug by forcing floating point)
calculate_bmi(Weight, Height, BMI) :-
    BMI is (Weight * 1.0) / (Height * Height).

% Clinical Math: Mifflin-St Jeor Equation for BMR
% Height comes in meters, but the formula requires cm (Height * 100)
calculate_bmr(male, Weight, Height, Age, BMR) :-
    BMR is (10 * Weight) + (6.25 * Height * 100) - (5 * Age) + 5.
calculate_bmr(female, Weight, Height, Age, BMR) :-
    BMR is (10 * Weight) + (6.25 * Height * 100) - (5 * Age) - 161.

% Clinical Math: TDEE Multipliers
calculate_tdee(BMR, sedentary, TDEE) :- TDEE is BMR * 1.2.
calculate_tdee(BMR, light, TDEE) :- TDEE is BMR * 1.375.
calculate_tdee(BMR, active, TDEE) :- TDEE is BMR * 1.55.
calculate_tdee(BMR, athlete, TDEE) :- TDEE is BMR * 1.725.

% Clinical Math: Target Calories linked to Goal
calculate_target_calories(TDEE, weight_loss, TargetCals) :- TargetCals is TDEE - 500.
calculate_target_calories(TDEE, weight_gain, TargetCals) :- TargetCals is TDEE + 500.
calculate_target_calories(TDEE, muscle_gain, TargetCals) :- TargetCals is TDEE + 250.
calculate_target_calories(TDEE, maintain, TargetCals) :- TargetCals is TDEE.

% Classify BMI with age considerations
classify_bmi(Age, _, Category) :-
    Age < 19,
    Category = 'Use growth charts - consult pediatrician'.

classify_bmi(Age, BMI, underweight) :-
    Age >= 19, Age =< 50,
    BMI < 18.5.

classify_bmi(Age, BMI, normal) :-
    Age >= 19, Age =< 50,
    BMI >= 18.5, BMI < 25.

classify_bmi(Age, BMI, overweight) :-
    Age >= 19, Age =< 50,
    BMI >= 25.

classify_bmi(Age, BMI, Category) :-
    Age > 50,
    BMI < 18.5, 
    Category = 'underweight (use with caution - consult doctor)'.

classify_bmi(Age, BMI, Category) :-
    Age > 50,
    BMI >= 18.5, BMI < 25,
    Category = 'normal (use with caution - consult doctor)'.

classify_bmi(Age, BMI, Category) :-
    Age > 50,
    BMI >= 25,
    Category = 'overweight (use with caution - consult doctor)'.

% =====================================================
% GOAL-BASED ADVICE
% =====================================================

advice_for_goal(weight_loss, [
    '- Focus on high fiber foods',
    '- Include lean protein in meals',
    '- Reduce processed foods and sugary drinks',
    '- Control portion sizes',
    '- Aim for 500 kcal deficit from maintenance'
]).

advice_for_goal(weight_gain, [
    '- Increase calorie intake by 300-500 kcal daily',
    '- Eat frequent meals and snacks',
    '- Include healthy fats (nuts, avocados, oils)',
    '- Add protein to every meal',
    '- Choose nutrient-dense foods'
]).

advice_for_goal(muscle_gain, [
    '- Consume adequate protein (1.6-2.2 g/kg body weight)',
    '- Eat within 2 hours after workout',
    '- Include complex carbs for energy',
    '- Stay well hydrated',
    '- Combine with resistance training'
]).

advice_for_goal(maintain, [
    '- Eat balanced meals with all food groups',
    '- Maintain consistent eating patterns',
    '- Listen to hunger and fullness cues',
    '- Stay physically active',
    '- Include variety in your diet'
]).

% =====================================================
% SYMPTOM-BASED ADVICE
% =====================================================

process_symptoms([], _).
process_symptoms([Symptom|Rest], Allergies) :-
    analyze_symptom(Symptom, Advice, Allergies),
    writeln(Advice),
    process_symptoms(Rest, Allergies).

analyze_symptom(fatigue, Advice, Allergies) :-
    find_safe_foods([spinach, lentils, red_meat, pumpkin_seeds], Allergies, SafeFoods),
    atomic_list_concat([
        'SYMPTOM: FATIGUE\n',
        '  * Nutritional Cause: Often linked to Iron or Magnesium deficiency affecting cellular energy production.\n',
        '  * Scientific Mechanism: Iron is crucial for hemoglobin to transport oxygen to tissues. Magnesium is required for ATP (energy) synthesis.\n',
        '  * Verified Sources: Incorporate ', SafeFoods, ' into your daily intake.\n',
        '  * Red Flag: If fatigue is severe, chronic, or accompanied by pale skin and shortness of breath, consult a doctor immediately for anemia testing.'
    ], '', Advice).

analyze_symptom(constipation, Advice, Allergies) :-
    find_safe_foods([oats, apples, chia_seeds, broccoli], Allergies, SafeFoods),
    atomic_list_concat([
        'SYMPTOM: CONSTIPATION\n',
        '  * Nutritional Cause: Primarily caused by inadequate dietary fiber and dehydration.\n',
        '  * Scientific Mechanism: Insoluble fiber adds bulk to stool, while soluble fiber softens it. Water is required for peristalsis.\n',
        '  * Verified Sources: Eat more ', SafeFoods, ' and drink at least 2.5L of water.\n',
        '  * Red Flag: If accompanied by severe abdominal pain, blood in stool, or unexplained weight loss, seek immediate medical care.'
    ], '', Advice).

analyze_symptom(headache, Advice, Allergies) :-
    find_safe_foods([bananas, almonds, watermelon, spinach], Allergies, SafeFoods),
    atomic_list_concat([
        'SYMPTOM: HEADACHE\n',
        '  * Nutritional Cause: Frequently triggered by dehydration, hypoglycemia (low blood sugar), or magnesium deficiency.\n',
        '  * Scientific Mechanism: Dehydration causes brain tissue to contract slightly, triggering pain receptors. Magnesium acts as a natural vasodilator, relaxing blood vessels.\n',
        '  * Verified Sources: Try ', SafeFoods, ' and ensure consistent fluid intake.\n',
        '  * Red Flag: If headache is sudden/severe ("thunderclap"), or accompanied by vision loss or numbness, seek emergency care immediately.'
    ], '', Advice).

analyze_symptom(muscle_cramps, Advice, Allergies) :-
    find_safe_foods([bananas, sweet_potatoes, spinach, yogurt], Allergies, SafeFoods),
    atomic_list_concat([
        'SYMPTOM: MUSCLE CRAMPS\n',
        '  * Nutritional Cause: Depletion of electrolytes (Potassium, Magnesium, Calcium) or sodium imbalance.\n',
        '  * Scientific Mechanism: Electrolytes dictate the electrical gradients across cell membranes necessary for muscle contraction and relaxation.\n',
        '  * Verified Sources: Eat more ', SafeFoods, '.\n',
        '  * Red Flag: If cramps occur with chest pain or severe swelling in the legs, seek immediate medical evaluation.'
    ], '', Advice).

analyze_symptom(poor_concentration, Advice, Allergies) :-
    find_safe_foods([salmon, walnuts, blueberries, eggs], Allergies, SafeFoods),
    atomic_list_concat([
        'SYMPTOM: POOR CONCENTRATION\n',
        '  * Nutritional Cause: Often related to insufficient Omega-3 fatty acids, B-vitamins, or erratic blood glucose levels.\n',
        '  * Scientific Mechanism: DHA (an Omega-3) is a structural component of the brain. B-vitamins are essential for neurotransmitter synthesis.\n',
        '  * Verified Sources: Consume more ', SafeFoods, '.\n',
        '  * Red Flag: If accompanied by memory loss, confusion, or difficulty speaking, consult a neurologist.'
    ], '', Advice).

analyze_symptom(bloating, Advice, Allergies) :-
    find_safe_foods([ginger, peppermint, yogurt, fennel, papaya], Allergies, SafeFoods),
    atomic_list_concat([
        'SYMPTOM: BLOATING & GAS\n',
        '  * Nutritional Cause: Fermentation of undigested carbohydrates (FODMAPs) or dysbiosis in the gut microbiome.\n',
        '  * Scientific Mechanism: Bacteria in the colon ferment undigested sugars, producing hydrogen and methane gas. Prokinetics (like ginger) accelerate gastric emptying.\n',
        '  * Verified Sources: Incorporate ', SafeFoods, ' into your daily intake. Reduce high-sodium and highly processed foods.\n',
        '  * Red Flag: If accompanied by severe abdominal pain, unexplained weight loss, or blood in stool, seek immediate medical attention.'
    ], '', Advice).

analyze_symptom(acid_reflux, Advice, Allergies) :-
    find_safe_foods([oatmeal, bananas, melon, ginger, leafy_greens], Allergies, SafeFoods),
    atomic_list_concat([
        'SYMPTOM: ACID REFLUX (HEARTBURN)\n',
        '  * Nutritional Cause: Weak lower esophageal sphincter (LES) triggered by dietary irritants (caffeine, high fat, spicy foods).\n',
        '  * Scientific Mechanism: High-fat foods delay gastric emptying, increasing stomach pressure and acid exposure to the esophagus.\n',
        '  * Verified Sources: Incorporate low-acid choices like ', SafeFoods, '. Avoid eating within 3 hours of lying down.\n',
        '  * Red Flag: Frequent reflux (GERD) increases the risk of esophageal damage. Chronic symptoms warrant a gastroenterology consult.'
    ], '', Advice).

analyze_symptom(acne, Advice, Allergies) :-
    find_safe_foods([salmon, walnuts, flaxseed, green_tea, berries], Allergies, SafeFoods),
    atomic_list_concat([
        'SYMPTOM: ACNE / SKIN BREAKOUTS\n',
        '  * Nutritional Cause: Often linked to high glycemic load diets and dairy triggering IGF-1 (Insulin-like Growth Factor).\n',
        '  * Scientific Mechanism: High insulin spikes increase sebum production and androgen activity, clogging pores and promoting inflammation.\n',
        '  * Verified Sources: Focus on anti-inflammatory omega-3s and antioxidants like ', SafeFoods, '. Consider a low-glycemic diet.\n',
        '  * Red Flag: Deep cystic acne causing scarring may require prescription dermatology treatments (e.g., retinoids) beyond dietary changes.'
    ], '', Advice).

analyze_symptom(joint_pain, Advice, Allergies) :-
    find_safe_foods([turmeric, salmon, olive_oil, cherries, chia_seeds], Allergies, SafeFoods),
    atomic_list_concat([
        'SYMPTOM: JOINT PAIN / INFLAMMATION\n',
        '  * Nutritional Cause: High ratio of Omega-6 to Omega-3 fatty acids and excess refined carbohydrates driving systemic inflammation.\n',
        '  * Scientific Mechanism: Omega-3s produce resolvins and protectins that actively terminate the inflammatory response in synovial fluids.\n',
        '  * Verified Sources: Emphasize anti-inflammatory fats and polyphenols such as ', SafeFoods, '.\n',
        '  * Red Flag: If joints are hot, swollen, or accompanied by a fever, this could indicate acute septic arthritis or severe autoimmune flare—see a doctor.'
    ], '', Advice).

analyze_symptom(hair_loss, Advice, Allergies) :-
    find_safe_foods([eggs, spinach, sweet_potatoes, oysters, nuts], Allergies, SafeFoods),
    atomic_list_concat([
        'SYMPTOM: HAIR THINNING / LOSS\n',
        '  * Nutritional Cause: Deficiencies in Iron, Zinc, Biotin, or insufficient overall protein intake.\n',
        '  * Scientific Mechanism: Hair follicles have high cellular turnover demanding robust microvascular blood flow (iron) and protein synthesis (zinc).\n',
        '  * Verified Sources: Ensure adequate intake of ', SafeFoods, ' along with high-quality protein.\n',
        '  * Red Flag: Sudden patchy hair loss (alopecia areata) or loss accompanied by thyroid symptoms (weight changes, cold intolerance) requires endocrinology testing.'
    ], '', Advice).

% Find safe foods considering allergies
find_safe_foods(Foods, Allergies, SafeString) :-
    findall(F, (member(F, Foods), \+ allergen_in_food(F, Allergies)), SafeList),
    atomic_list_concat(SafeList, ', ', SafeString).

% Check if food contains allergen
allergen_in_food(milk, Allergies) :- member(dairy, Allergies).
allergen_in_food(cheese, Allergies) :- member(dairy, Allergies).
allergen_in_food(peanuts, Allergies) :- member(nuts, Allergies).
allergen_in_food(almonds, Allergies) :- member(nuts, Allergies).
allergen_in_food(eggs, Allergies) :- member(eggs, Allergies).
allergen_in_food(wheat, Allergies) :- member(gluten, Allergies).
allergen_in_food(oats, Allergies) :- member(gluten, Allergies). % cross-contamination
allergen_in_food(shrimp, Allergies) :- member(shellfish, Allergies).
allergen_in_food(_, _) :- fail.

% =====================================================
% GENERAL RECOMMENDATIONS BY AGE
% =====================================================

general_recommendations(Age, Allergies) :-
    (Age < 13 ->
        writeln('- Ensure adequate calcium and vitamin D for bone growth'),
        writeln('- Iron-rich foods for brain development'),
        writeln('- Regular meals and healthy snacks')
    ; Age < 19 ->
        writeln('- Higher iron needs - especially for girls'),
        writeln('- Calcium critical for bone development'),
        writeln('- Adequate calories for growth spurts')
    ; Age < 51 ->
        writeln('- Women: Ensure adequate iron intake'),
        writeln('- Both: Maintain calcium and vitamin D'),
        writeln('- Balance calories with activity level')
    ;
        writeln('- Increase vitamin D and calcium for bone health'),
        writeln('- Adequate protein to prevent muscle loss'),
        writeln('- Consider B12 supplements as absorption decreases')
    ),
    
    % Allergy-specific advice
    (member(dairy, Allergies) ->
        writeln('- Dairy alternatives: soy milk, almond milk, oat milk')
    ; true),
    (member(gluten, Allergies) ->
        writeln('- Gluten-free grains: rice, quinoa, maize, certified oats')
    ; true),
    (member(nuts, Allergies) ->
        writeln('- Nut alternatives: seeds (pumpkin, sunflower), legumes')
    ; true).

% =====================================================
% DISCLAIMER
% =====================================================

show_disclaimer :-
    writeln('============================================='),
    writeln('               DISCLAIMER'),
    writeln('============================================='),
    writeln('This system provides GENERAL NUTRITION ADVICE only.'),
    writeln('It does NOT diagnose disease or prescribe medication.'),
    writeln('Always consult a healthcare professional for:'),
    writeln('- Severe or persistent symptoms'),
    writeln('- Medical conditions'),
    writeln('- Before starting major dietary changes'),
    writeln('============================================='),
    writeln('Thank you for using the Diet & Nutrition Expert System!'),
    writeln('=============================================').

% =====================================================
% UTILITY PREDICATES
% =====================================================

% Read a line of input
read_line(String) :-
    read_line_to_string(user_input, String).

% Print a list
print_list([]).
print_list([H|T]) :-
    writeln(H),
    print_list(T).

% =====================================================
% API ENTRY POINT (called by Express server)
% =====================================================

% generate_diet(+Age, +Gender, +Weight, +Height, +Activity, +Goal, +Allergies)
% Entry point for the Preventive Health Mode (Balanced Diet)
generate_diet(Age, Gender, Weight, Height, Activity, Goal, Allergies) :-
    retractall(user_age(_)),
    retractall(user_weight(_)),
    retractall(user_height(_)),
    retractall(user_goal(_)),
    retractall(user_allergy(_)),

    assert(user_age(Age)),
    assert(user_weight(Weight)),
    assert(user_height(Height)),
    assert(user_goal(Goal)),

    maplist(assert_allergy_fact, Allergies),

    % Calculate BMI
    calculate_bmi(Weight, Height, BMI),
    classify_bmi(Age, BMI, BMICategory),
    
    % Calculate BMR & TDEE (Clinical Formulas)
    calculate_bmr(Gender, Weight, Height, Age, BMR),
    calculate_tdee(BMR, Activity, TDEE),
    calculate_target_calories(TDEE, Goal, TargetCals),
    
    % Calculate Macronutrients (40/30/30 split)
    Carbs is round((TargetCals * 0.40) / 4),
    Protein is round((TargetCals * 0.30) / 4),
    Fats is round((TargetCals * 0.30) / 9),
    
    % Display results
    writeln('============================================='),
    writeln('    PREVENTIVE HEALTH: BALANCED DIET PLAN'),
    writeln('============================================='),
    format('Patient Profile: ~w years | ~w | ~w kg | ~w m~n', [Age, Gender, Weight, Height]),
    format('Activity Level: ~w | Primary Goal: ~w~n', [Activity, Goal]),
    format('BMI: ~2f (~w)~n', [BMI, BMICategory]),
    writeln(''),
    
    % Daily Nutritional Targets
    writeln('DAILY NUTRITIONAL TARGETS:'),
    format('- Basal Metabolic Rate (BMR): ~0f kcal/day~n', [BMR]),
    format('- Total Daily Energy Exp. (TDEE): ~0f kcal/day~n', [TDEE]),
    format('- Target Daily Intake: ~0f kcal/day~n', [TargetCals]),
    writeln('- Recommended Macronutrient Split:'),
    format('  * Carbohydrates (40%): ~w g~n', [Carbs]),
    format('  * Protein (30%): ~w g~n', [Protein]),
    format('  * Fats (30%): ~w g~n', [Fats]),
    writeln(''),
    
    % Goal advice
    writeln('GOAL-BASED MEDICAL ADVICE:'),
    advice_for_goal(Goal, GoalAdvice),
    print_list(GoalAdvice),
    writeln(''),
    
    % General recommendations
    writeln('GENERAL RECOMMENDATIONS:'),
    general_recommendations(Age, Allergies),
    writeln('').

% analyze_symptoms(+Symptoms, +Allergies)
% Entry point for the Support Mode (Symptom Guidance)
analyze_symptoms(Symptoms, Allergies) :-
    writeln('============================================='),
    writeln('   SUPPORT MODE: SYMPTOM-BASED GUIDANCE'),
    writeln('============================================='),
    (Symptoms \= [] ->
        process_symptoms(Symptoms, Allergies)
    ;
        writeln('No symptoms provided.')
    ),
    writeln('').

% Helper predicates to assert facts from API lists
assert_symptom_fact(S) :- assert(user_symptom(S)).
assert_allergy_fact(A) :- assert(user_allergy(A)).

% =====================================================
% START THE PROGRAM AUTOMATICALLY (terminal mode)
% =====================================================

% This makes the program start immediately when loaded in terminal
:- initialization(start, main).

% =====================================================
% END OF KNOWLEDGE BASE
% =====================================================