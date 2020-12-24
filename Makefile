login:
	docker login -u $(u) -p $(p)

build-dj:
	docker build --force-rm $(options) -t eddjango:latest ./django/

tag-dj:
	docker tag $(id) $(u)/eddjango:latest

push-dj:
	docker push $(u)/eddjango:latest

build-dj-nx:
	docker build --force-rm $(options) -t eddjnginx:latest ./django/nginx/

tag-dj-nx:
	docker tag $(id) $(u)/eddjnginx:latest

push-dj-nx:
	docker push $(u)/eddjnginx:latest

build-ng:
	docker build --force-rm $(options) -t edangular:latest ./angular/

tag-ng:
	docker tag $(id) $(u)/edangular:latest

push-ng:
	docker push $(u)/edangular:latest

build-prod:
	$(MAKE) build options="--target production"

volume-rm:
	docker volume rm -f $(shell docker volume ls -q)

compose-start:
	docker-compose up --remove-orphans $(options)
	# docker compose up

compose-stop:
	docker-compose down --remove-orphans $(options)
	# docker compose down

compose-manage-py:
	docker-compose run --rm $(options) django python manage.py $(cmd)

compose-admin-py:
	docker-compose run --rm $(options) django django-admin.py $(cmd)