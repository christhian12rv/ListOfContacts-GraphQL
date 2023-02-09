import { PrismaClient } from '@prisma/client';
import ContactService from '../services/Contact.service';

type GraphQLContext = {
  prisma: PrismaClient
  contactService: ContactService
}

export default GraphQLContext;