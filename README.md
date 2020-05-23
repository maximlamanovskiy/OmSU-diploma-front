# Scheduler

System for creating timetable for university and manage it.
Also, this system can be use for working with classrooms and events.

## Initial steps

#### Install nvm

```shell script
$ sudo apt-get install build-essential libssl-dev
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
$ source ~/.profile
```

#### Install node

```shell script
$ nvm install v12.16.2
$ nvm use v12.16.2
```

Check your version:

```shell script
$ node -v
```

#### Install Yarn

Follow instructions on the [official page](https://classic.yarnpkg.com/en/docs/install#debian-stable)

#### Install dependencies

```shell script
$ yarn
```

#### Run application

```shell script
$ yarn start
```

#### Run application with mocks

* First you need to install json-server
```shell script
$ npm install -g json-server
```

* Then in one terminal you should start mock json-server

```shell script
$ yarn mock-server
```

* And now you can run application

```shell script
$ yarn run-mock
```

#### To create build, run

```shell script
$ yarn build
```

## Available scripts
* `yarn start` - starts dev server
* `yarn build` - makes production build
* `yarn prettier` - runs prettier on whole project
* `yarn lint-js` - runs eslint on whole project
* `yarn lint-js:fix` - runs eslint on whole project and fixes issues that is possible to fix automatically
* `yarn lint-style` - runs stylelint on whole project
* `yarn lint-style:fix`- runs stylelint on whole project and fixes issues that is possible to fix automatically
* `yarn lint` - runs both linters on whole project
* `yarn lint:fix` - runs both linters on whole project and fixes issues that is possible to fix automatically
* `yarn run-mock` - starts dev server using mocks
* `yarn mock-server` - starts mock server for mock version

