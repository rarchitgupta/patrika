FROM python:3.11-slim-buster

RUN apt-get update && \
    apt-get install -y libpq-dev gcc ffmpeg libsm6 libxext6

RUN pip install poetry==1.6.1

RUN poetry config virtualenvs.create false

WORKDIR /api

COPY ./pyproject.toml ./poetry.lock* ./

COPY ./Poetry_README.md ./README.md

COPY ./package[s] ./packages

RUN poetry install  --no-interaction --no-ansi --no-root

COPY ./app ./app

RUN poetry install --no-interaction --no-ansi

EXPOSE 8000

CMD exec uvicorn app.server:app --host 0.0.0.0 --port 8000
