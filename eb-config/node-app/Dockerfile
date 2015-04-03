FROM ubuntu:14.04

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y git git-core wget zip nodejs npm ruby

# Symlinking Nodejs for ubuntu
RUN ln -s /usr/bin/nodejs /usr/bin/node

# NPM install globals
RUN npm install -g bower
RUN gem install sass

EXPOSE 80

# startup
ADD start.sh /tmp/
RUN chmod +x /tmp/start.sh
CMD ./tmp/start.sh
