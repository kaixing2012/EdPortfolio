# Stage 1
FROM python:3.8.6-slim as production

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /usr/proj/django

# Install psycopg2 dependencies
# RUN apk update && \
#     apk add postgresql-dev gcc python3-dev musl-dev
RUN apt-get update && \
    apt-get install -y \
    bash \
    build-essential \
    gcc \
    libffi-dev \
    musl-dev \
    openssl \
    postgresql \
    libpq-dev

# Create static folders
RUN mkdir /usr/proj/django/static
RUN mkdir /usr/proj/django/media

# Upgrade pip 
RUN pip install --upgrade pip

# Install dependencies
COPY requirements/prod.txt ./requirements/prod.txt
RUN pip install -r ./requirements/prod.txt

# Copy project
COPY . .



# # Stage 1
# COPY manage.py ./manage.py
# COPY setup.cfg ./setup.cfg
# COPY root ./root

# # Stage 2
# FROM production as development
# COPY requirements/dev.txt ./requirements/dev.txt
# RUN pip install -r ./requirements/dev.txt
# COPY . .