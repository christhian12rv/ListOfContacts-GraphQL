import { ApolloServer } from 'apollo-server';
import { GraphQLFormattedError } from 'graphql';
import logger from './config/logger';
import graphql from './graphql';
import ContextInterface from './interfaces/ContextInterface';
import { PrismaClient } from '@prisma/client';
import ContactService from './services/Contact.service';

const prisma = new PrismaClient();

const server = new ApolloServer({
	...graphql,
	context: (): ContextInterface => ({
		prisma: prisma,
		contactService: new ContactService(prisma),
	}),
	formatError: (err): GraphQLFormattedError => new Error(err.message),
});

server.listen({ port: 5003, }).then(async ({ url, }) => {
	logger.info(`Servidor rodando em ${url}`);
});