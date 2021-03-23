#!/bin/bash

source ./config/config.sh
export PGPASSWORD=$PGPASSWORD

echo "Configuring db"

dropdb -U postgres googleauth
createdb -U postgres googleauth

psql -U postgres googleauth < ./database/database.sql

echo "db configured"