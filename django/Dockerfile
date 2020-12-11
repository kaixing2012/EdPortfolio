# Stage 1
FROM python:3.7 as production
ENV PYTHONUNBUFFERED=1
WORKDIR /usr/proj/django
# RUN apt-get update && \
#     apt-get install -y \
#     bash \
#     build-essential \
#     gcc \
#     libffi-dev \
#     musl-dev \
#     openssl \
#     postgresql \
#     libpq-dev
COPY requirements/prod.txt ./requirements/prod.txt
RUN pip install -r ./requirements/prod.txt
COPY manage.py ./manage.py
# COPY setup.cfg ./setup.cfg
COPY root ./root

# Stage 2
FROM production as development
COPY requirements/dev.txt ./requirements/dev.txt
RUN pip install -r ./requirements/dev.txt
COPY . .
