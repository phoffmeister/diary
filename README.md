# The Diary
A Diary built with Django and React.

## Install
```bash
# Install Python deps
pipenv install

# deal with migrations
pipenv run python diary/manage.py makemigrations api fe
pipenv run python diary/manage.py migrate

# create a superuser
pipenv run python diary/manage.py createsuperuser

# Install js deps
yarn install
```

## Run
```bash
# build react frontend
yarn run dev

# or for a production build
yarn run build

# fire up django
pipenv run python diary/manage.py runserver
```

