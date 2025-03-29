# Makefile - for BoilerPlate Project

BACKEND = docker-compose exec backend
FRONTEND = docker-compose exec frontend

up:
	docker-compose up --build

down:
	docker-compose down

restart:
	docker-compose down && docker-compose up --build

migrate:
	$(BACKEND) python manage.py migrate

makemigrations:
	$(BACKEND) python manage.py makemigrations

superuser:
	$(BACKEND) python manage.py createsuperuser

logs:
	docker-compose logs -f

swagger:
	open http://localhost:8000/swagger/

bash:
	$(BACKEND) /bin/sh

collectstatic:
	$(BACKEND) python manage.py collectstatic --noinput

clean:
	docker-compose down --volumes --remove-orphans
	docker system prune -a -f

.PHONY: up down restart migrate makemigrations superuser logs swagger bash collectstatic clean
