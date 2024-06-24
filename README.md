# ANDRITZ React Developer Assessment

## Project Overview

Develop a book management application that allows users to perform CRUD (Create, Read, Update, Delete) operations on a list of books.

The application should utilize `redux` for state management, `redux-thunk` for asynchronous operations, `react-hook-form` for form handling, `react-router-dom` for routing, and `module.scss` for styling.

The application will interact with a mock API provided by `json-server`.

All functionalities must be implemented according to the provided acceptance criteria, and all tests must pass.

## Getting Started

- Clone the provided repository.
- Install dependencies using `yarn` or `npm install`.
- Run the application using `yarn dev` or `npm run dev` which will start both the `vite` development server and the `json-server`

## User Stories

### User Story 1: View Book List

**As a** user \
**I want to** view a list of books \
**So that** I can see all the available books.

#### Acceptance Criteria:

- The list should display the title and author of each book.
- There should be a search bar to filter books by title or author.
- The list should support pagination with a **default number of 5 books** per page.

### User Story 2: Add a New Book

**As a** user \
**I want to** add a new book \
**So that** I can expand the collection.

#### Acceptance Criteria:

- A form should be provided to input the book's title and author.
- The form should include validation to ensure both fields are required.
- The new book should appear in the book list after successful submission.
- Optimistic UI updates should be implemented for a responsive user experience.

### User Story 3: Edit a Book

**As a** user \
**I want to** edit an existing book \
**So that** I can correct or update its details.

#### Acceptance Criteria:

- Each book in the list should have an "Edit" button that opens an edit form pre-filled with the book's current details.
- The form should include validation similar to the add form.
- The book list should reflect the updated details after successful submission.
- Optimistic UI updates should be implemented for a responsive user experience.

### User Story 4: Delete a Book

**As a** user \
**I want to** delete a book \
**So that** I can remove it from the collection.

#### Acceptance Criteria:

- Each book in the list should have a "Delete" button.
- Clicking "Delete" should remove the book from the list.
- A confirmation dialog should be shown before deletion.
- Optimistic UI updates should be implemented for a responsive user experience.

## Provided Source Code Structure

The provided repository contains the following structure:

```plaintext
src/
├── components/
│ ├── BookForm.tsx
│ ├── BookList.tsx
├── pages/
│ ├── AddBookPage.module.scss
│ ├── AddBookPage.tsx
│ ├── EditBookPage.module.scss
│ ├── EditBookPage.tsx
│ ├── HomePage.module.scss
│ ├── HomePage.tsx
├── redux/
│ ├── slices/
│ │ ├── booksSlice.ts
│ │ ├── booksSlice.selectors.ts
│ ├── hooks.ts
│ ├── store.ts
├── routes/
│ ├── public.routes.tsx
├── App.tsx
├── main.tsx
├── styles.css
├── types/
│ ├── book.ts
tests/
├── BookForm.test.tsx
├── BookList.test.tsx
├── booksSlice.test.ts
├── HomePage.test.tsx
db.json
index.html
package.json
README.md
vite.config.ts
```

You are free to add new files and restructure the provided code.

This structure is just a starting point for development and does not need to be followed exactly.

Some features have already been implemented, such as the routes, sections of the redux slice, and portions of the interface.

You are free to change it completely as long as the user stories are fulfilled and all tests pass accordingly.

You also have the flexibility to adjust tests as necessary to match your implementation.

## Evaluation Criteria

- All user stories must be implemented.
- The application should be fully functional with all CRUD operations.
- The UI should be responsive and styled using module.scss.
- All tests should pass, you may create more tests for extra credit.
- The application should handle errors gracefully and provide user feedback.
- Optional features are also encouraged for extra credits such as theme switching or internationalization.

## Submission

Submit your completed project via a GitHub repository link.
We strongly encourage pushing to a private and adding the recruiter as collaborator. \
Refer to: [Inviting collaborators to a personal repository](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)

## Notes

- You can use any libraries or tools as long as the core requirements are met.
- Ensure that your code is clean, well-documented, and follows best practices.
- Focus on functionality first; additional features are optional but appreciated.
