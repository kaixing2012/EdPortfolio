build-dj:
	docker build --force-rm $(options) -t eddjango:latest ./django

tag-dj:
	docker tag $(id) kaixing2012/eddjango:latest

push-dj:
	docker push kaixing2012/eddjango:latest

build-ng:
	docker build --force-rm $(options) -t edangular:latest ./angular

tag-ng:
	docker tag $(id) kaixing2012/edangular:latest

push-ng:
	docker push kaixing2012/edangular:latest

build-prod:
	$(MAKE) build options="--target production"

compose-start:
	docker-compose up --remove-orphans $(options)

compose-stop:
	docker-compose down --remove-orphans $(options)

compose-manage-py:
	docker-compose run --rm $(options) webapi python manage.py $(cmd)

compose-admin-py:
	docker-compose run --rm $(options) webapi django-admin.py $(cmd)