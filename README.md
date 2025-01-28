# Dating App Server

## Description

This is the server for the dating app. It is built using Node.js, NestJS, and MongoDB.

## Installation

### Clone the repository

```bash
git clone <repo-url>
```

### Install dependencies

```bash
$ npm install
```

### Environment variables

note: sops must be installed on your machine to get the environment variables

generate access keys from your aws account and paste them in your config

```bash
aws configure
```

```bash
npm run sops:decrypt
```

## Running the app

```bash
$ npm run start
```



