FROM ubuntu:18.04

RUN apt-get update && \
    apt-get -y upgrade && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq libpq-dev gcc python3.8 python3-pip && \
    apt-get clean

WORKDIR /app

COPY . /app/

RUN pip3 install -r requirements.txt &&


EXPOSE 8000/tcp

CMD ["/bin/sh", "-c", "python3 manage.py runserver"]