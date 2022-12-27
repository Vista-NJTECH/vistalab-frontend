docker rm -f vistaweb
docker rmi vistalab
docker build -t vistalab .
docker run --restart=unless-stopped -p 8091:3000 -d --name vistaweb vistalab