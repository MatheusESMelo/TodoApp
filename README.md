# Todo App

### Overview

This Todo App is a React Native application designed to help users manage their tasks efficiently. The app offers features like task creation, editing, deletion, marking tasks as completed, and more. It is built with a clean and user-friendly interface, making it accessible and easy to use. Below is a detailed description of its features and implementation.

# Features

### App Structure & Navigation

- Bottom Tab Navigation: The app uses a bottom tab navigator for seamless navigation between screens.

- React Navigation: Navigation is implemented using the React Navigation library, ensuring smooth transitions and a robust routing mechanism.

### Todo List Screen

- Add new tasks with names and optional due dates.

- Edit tasks to modify their name or due date.

- Delete tasks that are no longer needed.

- Mark tasks as completed, which moves them to the Completed Tasks Screen.

### Completed Tasks Screen

- Displays a list of all tasks that have been marked as completed.

- Allows users to remove completed tasks permanently.

### State Management

- useState is used for managing the local state of components.

- useEffect ensures tasks are persisted and loaded when the app starts.

### UI Design

- Clean and Friendly Interface: The app is designed to be visually appealing and intuitive.

### Persistence

- Tasks and their statuses are stored using AsyncStorage, ensuring data is preserved between app sessions.

- Tasks are automatically loaded when the app is launched.

### Additional Features

- Search Bar: Allows users to search for tasks by name.

- Tasks can have optional due dates.

- Sorting Options: Users can sort tasks by name, status, creation date, or due date.

### Authentication

- Basic Login System: Users must log in with an email and password (mock authentication).

- Access to the Todo List and Completed Tasks screens is restricted to logged-in users.

- Authentication state is managed using context.

# Technical Details

### Installation

Clone the repository:

```bash
git clone https://github.com/MatheusESMelo/TodoApp.git
```

Install dependencies:

```bash
cd TodoApp
npm install
```

Start the app:

```bash
npm run android
#or
npm run ios
```

### Usage

Launch the app and log in using the mock credentials.

```json
{
  "email": "admin@adm.com",
  "password": "adm123"
}
```

- Attention: In the app there is a button called "Bypass Login" below the login button (this button is not shown in the video because it is commented, but in the main branch it will be uncommented), it was created just to facilitate login to the development environment and tests, this button calls the login function already passing the email and password parameters, so the developer or tester does not need to spend time always writing the login and password to enter the app.

Navigate between the Todo List and Completed Tasks screens using the bottom tab bar.

Add, edit, delete, and mark tasks as completed.

Use the search bar and sorting features to organize tasks efficiently.

# Video

### Showcase Video

Watch the app in action:

[Todo List App Showcase](https://drive.google.com/file/d/17VlStfGyEffE5tQGeLdo7mFGUPaemGGz/view?usp=sharing)

Click the link above to view the demo on google drive.
