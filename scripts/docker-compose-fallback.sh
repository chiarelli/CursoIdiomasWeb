#!/bin/sh

COMPOSE_FILE="$1"
shift

if command -v docker > /dev/null && docker compose version > /dev/null 2>&1; then
  docker compose -f "$COMPOSE_FILE" "$@"
elif command -v docker-compose > /dev/null 2>&1; then
  docker-compose -f "$COMPOSE_FILE" "$@"
else
  echo "❌ Nenhum comando docker compose ou docker-compose encontrado."
  exit 1
fi