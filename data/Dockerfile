FROM python:3.12
RUN pip install pipenv
COPY Pipfile* .
RUN pipenv install  --system --deploy --ignore-pipfile
COPY . .
CMD python main.py
