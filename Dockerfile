#Ce fichier va définir l’environnement du conteneur. 

# Image officielle Node.js 
FROM node:18 
 
# Définition du répertoire de travail 
WORKDIR /app 
 
# Copie des fichiers et installation des dépendances 
COPY package.json package-lock.json ./ 
RUN npm install 
 
# Copie du reste des fichiers 
COPY . . 
 
# Exposition du port et démarrage du serveur 
EXPOSE 3000 
CMD ["node", "server.js"] 
