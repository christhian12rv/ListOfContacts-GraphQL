import { join } from 'path';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const allTypes = loadFilesSync(join(__dirname, 'modules', '**', '*.gql'));
const allResolvers = loadFilesSync(join(__dirname, 'modules', '**', 'resolvers.ts'));

const typeDefs = mergeTypeDefs(allTypes);
const resolvers = mergeResolvers(allResolvers);

export default {
	typeDefs,
	resolvers,
};