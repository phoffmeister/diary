# The Diary
A Diary built with Django and React.

## Prerequisit
Create a `.env` file and provide a secret. It can be obtained eg [here](https://djecrety.ir/)
```env
DJANGO_SECRET='paste your secret here'
```

## Install
```bash
# Install Python deps
pipenv install

# deal with migrations
pipenv run python diary/manage.py makemigrations api fe
pipenv run python diary/manage.py migrate

# (optional) load testuser admin:admin
pipenv run python diary/manage.py loaddata meta/fixtures/auth_DEVONLY.json

# (optional) load fixtures for drinks and medications
pipenv run python diary/manage.py loaddata meta/fixtures/api.json

# Install js deps
yarn install
```

## Run dev
```bash
# build react frontend
yarn run dev

# or for a production build
yarn run build

# fire up django
pipenv run python diary/manage.py runserver
```

