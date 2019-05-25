FROM ssube/isolex:feat-304-oot-svc

COPY . /oot-example

WORKDIR /oot-example

RUN yarn link

WORKDIR /app

RUN yarn link isolex-oot-example