# Lingua

Lingua is a Frappe-based application designed to streamline the day-to-day operations of foreign language institutions — from the first student inquiry all the way to graduation and certification.

<!-- It centralizes academic, administrative, and financial workflows into one consistent, customizable system built on the Frappe framework (and optionally ERPNext). -->

---

## Overview

Whether you run a single language school or a multi-branch institute teaching English, French, Chinese, Arabic, or any other language, Lingua helps you:

- Define language levels and curricula clearly  
- Manage students and classes efficiently  
- Support teachers with the right tools  
- Keep finance and operations tightly aligned with what actually happens in the classroom

At the heart of Lingua is a structured model of **languages** and **proficiency levels** (CEFR, HSK, JLPT, internal scales, etc.), which then powers placement, courses, groups, assessments, billing, and analytics.

---

## Core Concepts

### Lingua Level System

A **Lingua Level System** represents a standardized proficiency framework, such as:

- CEFR (A1, A2, B1, B2, C1, C2)
- HSK (HSK 1–6)
- JLPT (N5–N1)
- Your own internal scale (e.g. Beginner / Intermediate / Advanced)

Key behaviors:

- **Normalized codes** (e.g. `CEFR`, `HSK`) with enforced uniqueness
- **Status flags**: active / inactive, to phase systems in or out
- **Default system**: only one system is set as default at a time
- **Skill targeting**: systems can apply to *spoken*, *written*, or *both* skills

### Lingua Language

A **Lingua Language** represents each language you teach (e.g. English, French, Japanese, Arabic).

Per-language configuration:

- **Short, unique code** (e.g. `EN`, `FR`, `JP`)
- **Default Level System** (e.g. English → CEFR, Chinese → HSK)  
  - Validated to ensure it exists and is active
- **Active flag** to enable/disable languages without breaking historical data

These two doctypes form the **core data model** that other modules build on: language programs, courses, class groups, placement tests, exams, and reports.

---

## Typical Workflows (Current & Planned)

> Some of these are already implemented; others are natural next modules the app is structured to grow into.

### 1. Academic Structure & Curriculum

- Define **programs, courses, and levels** per language  
  (e.g. “English – A2 General”, “Chinese – HSK 3 Intensive”)
- Attach each course to a **Lingua Level System** and specific **level codes** (A1, A2, B1… or HSK1–HSK6)
- Maintain **syllabi, units, lesson plans** so teaching is consistent across instructors and groups

### 2. Student Lifecycle

Track each learner from the moment they appear on your radar:

1. Lead / prospect  
2. Placement test  
3. Admission  
4. Enrollment in a program / class  
5. Progress tracking  
6. Completion & certification

Planned capabilities:

- Store language goals, prior proficiency, and history per language
- Attach notes, follow-ups, and academic decisions to the student profile

### 3. Placement & Assessment

- Configure **placement tests** per language and per level system
- Record **placement test results** and map them to recommended starting levels
- Track ongoing **formative and summative assessments** (quizzes, midterms, finals)
- Use level descriptors to make grading more transparent and consistent

### 4. Classes, Scheduling & Resources

- Manage **class groups** (e.g. `EN-A2-GROUP1 – Mon/Wed 18:00–20:00`)
- Assign:
  - Language + Level  
  - Teacher  
  - Room / online meeting link  
  - Schedule / timetable
- Enforce **capacity limits** and prevent overbooking
- Maintain clear visibility into which groups are under- or over-enrolled

### 5. Teachers & Teaching Operations

- Keep a **profile per instructor**:
  - Languages taught
  - Levels they can teach
  - Preferred schedule / workload
- Record:
  - Teaching assignments
  - Classroom hours
  - Attendance & performance patterns of their groups
- (With ERP) integrate with **HR & Payroll** for load-based compensation and performance metrics

### 6. Attendance, Discipline & Follow-up

- Track **attendance per session per student**
- Flag students with:
  - Low attendance
  - Weak performance
  - Disciplinary or pastoral-care needs
- Log **advising sessions**, parent meetings, and interventions

### 7. Billing & Finance (ERPNext-Friendly)

When used with ERP, Lingua can plug directly into your financial processes:

- Define **fee structures** per language, level, program, or product (group classes, private lessons, online programs)
- Generate **Sales Invoices** or fee demands for:
  - New enrollments
  - Renewals / course extensions
  - Exam and certification fees
  - Books, materials, and other items
- Track **payments, discounts, scholarships, and refunds**, all linked back to academic records

### 8. Certifications & Transcripts

- Define completion rules per course (min. attendance, min. final grade, etc.)
- Automatically generate:
  - **Certificates** (e.g. “English B2 Completion”)
  - **Transcripts** with courses, levels, grades, and term dates
- Use Frappe Print Formats to create **branded, professional** PDFs

### 9. Communication & CRM

- Manage communication with students (and parents for younger learners) using:
  - Email
  - SMS
  - WhatsApp (via integrations)
- Use templates for:
  - Placement results
  - Class reminders
  - Exam schedules & results
  - Fee reminders & payment confirmations
- Track:
  - Leads by source/campaign
  - Follow-up history
  - Conversion metrics

### 10. Analytics & Reporting

With all data structured around languages and levels, you can build dashboards for:

- Enrollment by **language/level/term/branch**
- **Retention**, renewal, and drop-out rates
- Teacher **load** by language & level
- Revenue breakdown by language, program, or level system
- Placement test outcomes and trends (e.g. majority of leads placing at A2)

---

## Architecture & Integrations

Lingua is a **Fapp** and can be used:

- As a standalone module on top of Frappe
- Alongside **ERP** for full finance + HR integration
- Together with **FLMS** for online / self-paced courses

Key platform features leveraged:

- Role-based permissions & user management
- Custom fields & scripts to adapt to your institution
- Workflows for approvals (admissions, refunds, certificates, etc.)
- REST API & webhooks for integrations
- Multi-site / multi-tenant support for groups and franchises

---

## Current Status

✅ Implemented core doctypes:

- `Lingua Level System`  
- `Lingua Language`

These already include:

- Validation logic (unique codes, default system behavior, active checks)
- Unit tests (`bench run-tests --app lingua`) for core business rules
- Basic **Desk integration** via `lingua/config/desktop.py` to surface Lingua doctypes in the Frappe UI

🧩 Next planned modules (high-level):

- `Lingua Language Level` (per-language level mappings)
- `Lingua Language Program` (programs & courses)
- Class groups, sessions, and attendance
- Placement test templates and results
- Certification & transcripts
- ERPNext + FrappeLMS integration layer

---

## Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI.

From your bench folder:

```bash
cd $PATH_TO_YOUR_BENCH

# Get the app (adjust branch if needed: main/develop)
bench get-app https://github.com/IsaacMorzy/lingua.git --branch main

# Install on a site
bench --site your-site.localhost install-app lingua

# (Optional) Restart services
bench restart
Replace your-site.localhost with the actual site name in your bench.

Getting Started (After Installation)
Log in to your Frappe / ERPNext site as a System Manager.

In the Desk, open the Lingua module:

Configure at least one Lingua Level System (e.g. CEFR).

Mark one system as Default.

Add Lingua Language records:

Example: EN – English, default level system CEFR.

Example: ZH – Chinese, default level system HSK.

Start using these doctypes as the foundation for:

Course and program design

Placement test mapping

Reporting & analytics

Once the extended modules are added, you will also be able to:

Create Language Programs and Language Levels

Manage Class Groups, Sessions, and Attendance

Link enrollments to ERPNext documents and/or FrappeLMS courses

Development
You can run the app’s unit tests from your bench:

bash
Copy code
cd $PATH_TO_YOUR_BENCH
bench --site your-site.localhost run-tests --app lingua
Recommended dev setup:

Enable developer mode for your site

Use VS Code or your preferred IDE inside a dev container or local environment

Work on feature branches (e.g. feature/lingua-core-levels) and open PRs into main or develop

Contributing
This app uses pre-commit for code formatting and linting. Please install pre-commit and enable it for this repository:

bash
Copy code
cd apps/lingua
pre-commit install
Pre-commit is configured (or intended to be configured) to use the following tools for checking and formatting your code:

ruff (Python linting & formatting)

eslint (JavaScript/TypeScript linting)

prettier (code formatting)

pyupgrade (modernize Python syntax)

Basic contribution flow:

Create a branch:
git checkout -b feature/your-feature-name

Make your changes and ensure tests pass:
bench --site your-site.localhost run-tests --app lingua

Commit with a descriptive message:
git commit -m "feat: add XYZ module"

Push and open a Pull Request on GitHub.

CI
This app can use GitHub Actions for CI. Typical workflows:

CI

Installs Frappe, your site, and this app

Runs unit tests on every push to main/develop and on each PR

Linters

Runs Frappe Semgrep Rules against the code

Runs pip-audit to detect vulnerable dependencies

These pipelines help ensure that every new feature or bug fix keeps the codebase healthy, secure, and maintainable.

Roadmap (High-Level)
Some of the next capabilities planned for Lingua:

Lingua Language Level & Program modeling

Integrated Placement Test engine (templates + scoring rules)

Timetable and resource planning for classrooms and teachers

Deep ERP integration:

Fee structures

Invoicing

Payroll hooks

FLMS integration for self-paced and blended learning

Ready-made Dashboards for academic, operational, and financial KPIs

License
This project is licensed under the MIT License.

You are free to use, modify, and distribute it, subject to the terms of the MIT license.

pgsql
Copy code

