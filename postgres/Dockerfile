FROM postgres:latest
COPY setup-database.sh /docker-entrypoint-initdb.d/
COPY fill-authdb.sql /scripts/