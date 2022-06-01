FROM ubuntu:latest

RUN apt update ; \
    apt install; \
    \
    apt install sudo \
    npm \
    sudo \
    git -y;



RUN useradd --no-log-init --create-home --shell /bin/bash officeTool; \
    usermod -aG sudo officeTool; \
    \
    echo 'officeTool:cui' | chpasswd; \
    echo 'root:hnip' | chpasswd;


USER officeTool

WORKDIR /home/officeTool/DoD_Markings
