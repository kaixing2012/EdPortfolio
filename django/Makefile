build-env:
	virtualenv $(name)

install-req:
	pip install -r ./requirements/dev.txt
	
start-dj:
	python manage.py runserver

start-pg:
	docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres --name ed-django-postgres -v db-data:/var/lib/postgresql/data postgres

startserializer:
	python3 file_makers/start_serializer.py $(n) $(p)