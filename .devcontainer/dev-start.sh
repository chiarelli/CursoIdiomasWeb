#! /bin/bash

echo "DEBUG: UID=$(id -u) USER=$(whoami)"
echo "DEBUG: GIT_USER_NAME='$GIT_USER_NAME'"
echo "DEBUG: GIT_USER_EMAIL='$GIT_USER_EMAIL'"

# Configura Git automaticamente se variáveis estiverem definidas
if [[ -n "$GIT_USER_NAME" && -n "$GIT_USER_EMAIL" ]]; then
  git config --global user.name "$GIT_USER_NAME"
  git config --global user.email "$GIT_USER_EMAIL"
  echo "Git configurado com:"
  echo "  user.name = $GIT_USER_NAME"
  echo "  user.email = $GIT_USER_EMAIL"
else
  echo "Variáveis GIT_USER_NAME ou GIT_USER_EMAIL não definidas. Git não será configurado."
fi

# Continua com o comportamento normal (ex: npm run dev)
exec "$@"