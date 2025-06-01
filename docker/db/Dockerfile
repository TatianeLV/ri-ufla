ARG POSTGRES_VERSION=15
ARG POSTGRES_PASSWORD=dspace

FROM docker.io/postgres:${POSTGRES_VERSION}

ENV POSTGRES_DB=dspace
ENV POSTGRES_USER=dspace
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# Copia o script de inicializacao
COPY install-pgcrypto.sh /docker-entrypoint-initdb.d/