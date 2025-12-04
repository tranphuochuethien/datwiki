# DatWiki Backend

This is the Django backend for the DatWiki project.

## Prerequisites

- Python 3.10+
- pip

## Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Create a virtual environment:**

    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**

    - On Linux/macOS:
      ```bash
      source venv/bin/activate
      ```
    - On Windows:
      ```bash
      venv\Scripts\activate
      ```

4.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

5.  **Apply migrations:**

    ```bash
    python manage.py migrate
    ```

## Running the Server

To start the development server:

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/`.

## API Endpoints

-   `GET /api/articles/`: List all articles
-   `GET /api/articles/{slug}/`: Retrieve a specific article
-   `GET /api/topics/`: List all topics
-   `GET /api/tags/`: List all tags

## Project Structure

-   `api/`: Contains the API application logic (models, views, serializers).
-   `datwiki_backend/`: Contains the project settings and configuration.
-   `manage.py`: Django's command-line utility for administrative tasks.
