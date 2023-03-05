# CS319-Project
* Group Name: Quaso
* Members:
    - Zeynep Doğa Dellal 22002572
    - Yağız Alkılıç 22003281
    - Muhammad Ali Waris 22001037
    - Yağız Berk Uyar 21902318
    - Mustafa Hamit Dölek 21703136
* Tags: block
* Tested up to: 0.0
* License: In progress

# An application to aid the process of applying for internships for both companies and applicants

## Description

This application is expected to simplify the process of evaluating, submitting and confirming CS299/399 internship related documents, forms and applications. We expect to achieve this by using the state
of the art programming stacks and making the application more user friendly for both companies and applicants.

## Further Relevant Project Details

**Types of Users:**

- Super User Admin
- Students
- Instructors/Evaluators
- Company Owners.
- Coordinators
- TAs

**User Abilities**

**Company Owners:**

- Two types of forms, one at the beginning to confirm internship (in the beginning of the internship), second one to grade (at the end of the internship)
- Fill out a form regarding the course details
- Make the form according to the form provided as PDF/WORD

    **Process**:

    - A link is sent to the owner by the site
    - The owner logs in and fills out the relevant form
    - The link expires when the form is filled

**Students:**

- Provide relevant details about the company in the beginning of the internship (company name/ manager) so that the relevant mails go to the company and instructors
- Upload Reports
- See status of uploaded document.
- View their grades
- Limitation to which documents they can see
- If evaluator submitted feedback and requested revision, it shows in their page
- Be able to see their submitted report status and upload revision if necessary (there should be a revision upload limitation (maybe 2)).
- See a list of their submitted reports (deadlines, showing grade, revisions requests, revision deadlines.)

**Super User Admin:**

- Assign instructors/evaluators to students
- See everyone’s info
- Update/Replace/Remove all data/information
- Make new instructors/evaluators/students (if needed) accounts

**Instructors/Evaluators:**

- See their relevant student’s reports
- Look at a list which shows (Student name, report submission date, report submission status, grading status (Graded(if graded, show grade)/Ungraded)), see the company’s submitted form (as a button), and show a button to the grading form).
  - Basic text above the list to explain what each row/column/button/tick means.
- Instructors should be able to approve companies via the company button mentioned above, if the company is already in the list of approved companies the button will be replaced by an non-interactive tick. (When a company is approved, it should be added to a database list of approved companies (import the current list of approved companies)).
- View the submitted form by the company owner/manager.
- There should be a button “request revision”. Can submit report with feedback and request revision


**Coordinators:**

- Have a link to their websites.


**TAs:**
- Pre-approve reports.

**Site Ability:**

- Language Specifications
- Ability to login/logout user, evaluators, super-admins, coordinators, students
- All student capabilities.
- All evaluator capabilities.
- All super user capabilities.
- All company owner capabilities.
- Shows a home page (a section to choose the type of user you are and login).
- Shows a FAQ Page (without login).
- Shows an information page.
- Gives all users (company owners and students) the ability to edit their profile details 
- A menu item of “other related documents”.
- A general menu list items at the top of the home page (without login).

\-   Menu İtems change depending on the user after login.

- Export/import documents
  - Single Zips/ Full Data Zips
- Every user has a step-process that shows a process bar (for students).
- Evaluators get notifications regarding every student activity.


**Stuff that is still ambiguous**:

- What data do we get from Bilkent itself?
- Ask all stakeholders regarding notifications. Take opinions.


