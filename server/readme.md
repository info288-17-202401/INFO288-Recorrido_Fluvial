BUILD DOCKER
docker build -t my-python-app .

RUN DOCKER
docker run -p 5000:5000 my-python-app