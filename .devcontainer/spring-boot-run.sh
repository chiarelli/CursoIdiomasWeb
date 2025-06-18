#!/bin/sh
set -e

# Checkout ou troca para a branch dev
git checkout -b dev || git checkout dev

# Define o upstream apenas se ainda não estiver definido
git rev-parse --abbrev-ref --symbolic-full-name @{u} > /dev/null 2>&1 || \
    git branch --set-upstream-to=origin/dev dev

# Sincroniza com o branch remoto forçando o conteúdo
git fetch origin
git reset --hard origin/dev

# Executa o Spring Boot
mvn clean spring-boot:run -Dspring-boot.run.arguments=--server.address=0.0.0.0
