# RabbitMQ Library

A reusable RabbitMQ library for Node.js microservices, providing easy integration with RabbitMQ for message production and consumption.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Example](#example)
- [API Endpoints](#api-endpoints)
- [Requirements](#requirements)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- Simplified RabbitMQ connection management
- Easy-to-use producer and consumer services
- Configuration through environment variables
- Comprehensive logging using Pino

## Installation

To use this library in your microservices, you need to install it via npm.

```bash
npm install habesha-rabbitmq-lib


## Usage

Configuration
Ensure you have a .env file in your project root with the following environment variables:

``bash
RABBITMQ_URL=amqp://user:password@localhost:5672
PORT=3000
QUEUE_NAME=my-queue
