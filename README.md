
# DCIT313 - Group Tech Tutors - Nutrition Expert System

| Name [GitHub Username]                     | Student ID |
|-------------------------------------------|------------|
| Kelvin Agyare Yeboah [KelvCodes]          |  22159683          |
| Anthony Gudu [agudu50]                    |            |
| Boadu-Acheampong, Asante Yaw [asante-y]   |            |
| Ametefe, Elijah Kwadwo [Elijahamet]       | 22040783           |
| Frank Bless [frank-bless]                 |            |
| Justice Tieku [justice-tieku]             |  22105235          |
| Adjei Caleb [KAY-22-ux]                   | 22040866          |

## Project Overview

The **Nutrition Expert System** is a Knowledge-Based System (KBS) designed to provide intelligent nutritional guidance based on user inputs such as **age range, allergies, and symptoms**.

The system demonstrates a clear **mapping from perceptions (user inputs)** to **actions (dietary advice and food recommendations)** using symbolic reasoning.

The system uses **SWI-Prolog** to store expert knowledge in the form of **facts and rules**, while a **React interface** allows users to interact with the expert system through a simple and user-friendly interface.

The system aims to simulate the reasoning process of a **nutrition expert** by recommending balanced diets and nutrition-based food suggestions that may help reduce certain symptoms.

⚠️ The system does **not diagnose diseases**. It only provides **nutrition-related guidance**.



# System Architecture

The expert system follows a classical **Knowledge-Based System architecture**.

```

User (React Interface)
↓
Backend / Interface Layer
↓
SWI-Prolog Inference Engine
↓
Knowledge Base (Facts + Rules)

```

---

# Mapping From Perceptions To Actions

The system follows the AI principle of mapping **perceptions to actions**.

| Perception (User Input) | System Reasoning | Action (Output) |
|------------------------|------------------|----------------|
| Age Range | Determines nutritional needs | Balanced diet suggestion |
| Allergies | Filters unsafe foods | Safe food recommendations |
| Symptoms | Matches symptoms to possible nutrient deficiencies | Suggests foods that may help |
| Severe Symptoms | Safety rules trigger | Suggests medical consultation |

---

# Repository Structure

```

DCIT313-Group-Tech-Tutors-Nutrition-Expert-System

knowledge_base/
nutrition_kb.pl

interface/
react-ui/

docs/
knowledge-engineering-report.md

README.md

````

| Component | Directory | Description | AI Role |
|----------|----------|-------------|--------|
| Knowledge Base | `/knowledge_base` | Prolog file containing facts and rules | Memory / Intelligence |
| Interface | `/interface` | React-based user interface | User Interaction |
| Documentation | `/docs` | Knowledge engineering report and research sources | Knowledge Acquisition |

---

# Knowledge Base

The **Knowledge Base** is implemented in **SWI-Prolog** and contains:

- Nutrition facts
- Food–nutrient relationships
- Symptom–nutrient relationships
- Allergy restrictions
- Safety rules

Example Prolog facts:

```prolog
rich_in(spinach, iron).
rich_in(banana, potassium).

possible_cause(headache, dehydration).
possible_cause(headache, magnesium_deficiency).
````

Example rule:

```prolog
suggest_food(Symptom, Food) :-
    possible_cause(Symptom, Nutrient),
    rich_in(Food, Nutrient).
```

This allows the system to reason like a **human nutrition expert**.

---

# Knowledge Engineering

The knowledge used in this system was obtained from credible sources including:

* World Health Organization (WHO)
* Food and Agriculture Organization (FAO)
* Harvard School of Public Health
* National Institutes of Health (NIH)
* MedlinePlus

This knowledge was translated into **logical facts and rules** using Prolog.

---

# System Capabilities

The expert system can:

* Generate **balanced diet recommendations**
* Suggest **foods that may help alleviate symptoms**
* Filter recommendations based on **user allergies**
* Provide **basic nutrition guidance**
* Recommend **medical consultation for severe symptoms**

---

# Group Members

| Name                        | Student ID |
| --------------------------- | ---------- |
| Boadu-Acheampong Asante Yaw | 22152286   |
| Anthony Gudu                | 2201487    |
| Ametefe Kwadwo Elijah       | 22040783   |
| Tieku Justice               | 22105235   |
| Tsetse Frank Bless Kofi     | 22027295   |
| Adjei Caleb Yaw Kakra       | 22040866   |
| Agyare Kelvin Yeboah        | 22159683   |

---

## Roles and Responsibilities

| Role | Responsibility |
|-----|---------------|
| Project Manager | Oversees the project progress, coordinates team activities, ensures deadlines are met, and manages communication within the team. |
| Knowledge Engineers | Responsible for researching credible nutrition and medical sources and translating the acquired knowledge into logical facts and rules in the Prolog knowledge base. |
| Programmers | Responsible for implementing the system, including the React interface, integrating the Prolog knowledge base, and ensuring the system correctly maps user inputs to intelligent outputs. |

---

# Academic Integrity

This project follows proper **Knowledge-Based System design principles**:

* Intelligence is stored in **Prolog rules**
* The interface only handles **user interaction**
* Logical reasoning is performed by the **Prolog inference engine**

All documentation complies with the **Turnitin similarity requirement (<15%)**.

---

# Disclaimer

This system provides **nutrition-related guidance only** and should not replace professional medical advice.

Users experiencing serious symptoms should consult a qualified healthcare professional.


