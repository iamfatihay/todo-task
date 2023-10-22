# Todo Task

## Description

This project is a ToDo Application. It consists of two main components: a backend and a frontend, designed to track the tasks. The backend is built using Django, while the frontend is developed with React.

## Project Skeleton
```
backend:
    db.sqlite3:                  SQLite database file.
    dockerfile:                  Configuration file for Docker containers.
    main:
        __init__.py:             Initial file for the Python package.
        asgi.py:                 Entry file for ASGI application.
        settings.py:             Django project settings.
        urls.py:                 Django URL configurations.
        wsgi.py:                 Entry file for WSGI application.
    manage.py:                   Main file for Django project management commands.
    requirements.txt:            List of Python packages used in the project.
    todo:
        __init__.py:             Initial file for the "todo" application.
        admin.py:                Django admin panel configuration.
        apps.py:                 Application configuration.
        migrations:
            0001_initial.py:     Initial database migration.
            __init__.py:         Initial file for migrations.
        models.py:               Database models.
        serializers.py:          Django REST framework serializers.
        tests.py:                Application tests.
        urls.py:                 Application URL configurations.
        views.py:                View functions.

frontend:
    dockerfile:                      Configuration file for Docker containers.
    package-lock.json:               Files containing Node.js package information and 
    package.json:                    dependencies.       
    public:
        index.html:                  The main HTML entry file for the application.
        src:
            App.css:                 Application styling.
            App.js:                  Main application component.
            components:
                AddTask.jsx:         Task addition component.
                EditItemForm.jsx:    Item editing form.
                ShowGroups.jsx:      Component for displaying groups.
                ShowTasks.jsx:       Component for displaying tasks.
            helper:
                ToastNotify.js:      Helper function for displaying notifications.
            index.js:                Entry point for the application.
            pages:
                Home.jsx:            Main homepage component.
    README.md:                       Documentation for the frontend part of the project.
env:                                 env isolates project dependencies.
docker-compose.yml:                  It defines Docker application configurations.
todo.gif:                            A GIF related to the project

```
## Expected Outcomes
<div >
<img width="660px" src="./todo.gif"/>
</div>

## Technologies and Libraries
- <span style="font-size: larger;">**React.js**</span>: A powerful JavaScript library for building interactive user interfaces.
- <span style="font-size: larger;">**Redux**</span>: A predictable state management library for managing complex application states.
- <span style="font-size: larger;">**Axios**</span>: A popular HTTP client for making API requests and handling responses.
- <span style="font-size: larger;">**Tailwind CSS**</span>: A highly customizable CSS framework for creating stunning designs with minimal effort.
- <span style="font-size: larger;">**React Router**</span>: A popular routing library for React applications, allowing for dynamic and intuitive navigation between different pages within the application.
- <span style="font-size: larger;">**Formik and Yup**</span>: Powerful JavaScript libraries used for form management and validation. Yup is used to define validation schemas for form data, specifying the expected shape and constraints. On the other hand, Formik simplifies form state management, submission handling, and validation. Together, they ensure robust form validation and streamlined form handling for user input data.
- <span style="font-size: larger;">**Custom Hooks**</span>: Custom hooks have been implemented to encapsulate reusable logic and improve code organization and reusability. These custom hooks include:

    - **useAuthCall**: A custom hook that handles authentication-related API calls and state management.
    - **useAxios**: A custom hook that simplifies making HTTP requests using Axios and manages the loading and error states.
    - **useStockCall**: A custom hook that encapsulates the logic for making stock-related API calls and managing the stock-related states.
## Usage with Docker
1. Install Docker Desktop and open if not already installed.
2. Open the terminal.
3. Pull the backend docker image:
   ```
   docker pull fatihay/backend_1
4. Pull the frontend docker image:
    ```
   docker pull fatihay/frontend_1
5. Run the backend image:
    ```
   docker run -d -p 8000:8000 --name back_8000 fatihay/backend_1
6. Run the frontend image:
    ```
   docker run -d -p 3000:3000 --name front_3000 fatihay/frontend_1
7. Open your web browser and visit  **http://localhost:3000**  to explore the Todo Application.
## Installation

To set up and run this project locally, follow these steps:

### Backend Installation
1. Navigate to the `backend` directory.
2. Create a virtual environment:
   ```
   python -m venv env
3. Activate the virtual environment:
- On Windows:
  ```
  env\Scripts\activate
  ```
- On macOS and Linux:
  ```
  source env/bin/activate
  ```
4. Install Python dependencies:
    ```
   pip install -r requirements.txt
5. Create .env file with 'SECRET_KEY' environment variable.
6. Apply database migrations:
    ```
    python manage.py makemigrations
    python manage.py migrate
### Frontend Installation

1. Navigate to the `frontend` directory.
2. Install Node.js and npm if not already installed.
3. Install project dependencies:
    ```
    npm install
## Usage

### Backend Usage
1. Run the development server:
    ```
    python manage.py runserver
- The backend server is running at `http://localhost:8000`.
- API endpoints are available for interacting with tasks.

### Frontend Usage

- Start the frontend development server:
    ```
    npm start
- The frontend is accessible at `http://localhost:3000`.



## Contribution
Welcome contributions to enhance the Stock Application! If you find any bugs or have ideas for improvements, please open an issue or submit a pull request. I appreciate your valuable input!

## License

The Stock Application is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.
