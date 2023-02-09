import ContactInterface from '../../../interfaces/ContactInterface';
import ContextInterface from '../../../interfaces/ContextInterface';

export default {
	Query: {
		async contacts(obj, args, context: ContextInterface): Promise<ContactInterface[]> {
			const contacts = await context.prisma.contact.findMany();
			return contacts;
		},
	},
	Mutation: {
		async createContact(obj, { data, }, context: ContextInterface): Promise<ContactInterface> {
			const { name, email, phone, } = data;

			const existingContact = await context.prisma.contact.findUnique({
				where: {
					email,
				},
			});

			if (existingContact)
				throw new Error(`There is already a contact with email ${email}`);

			const contact = await context.prisma.contact.create({
				data: {
					name,
					email,
					phone,
				},
			});

			return contact;
		},
		async updateContact(obj, { id, data, }, context: ContextInterface): Promise<ContactInterface> {
			const { name, email, phone, } = data;

			const existingContactId = await context.prisma.contact.findUnique({
				where: {
					id,
				},
			});

			if (!existingContactId)
				throw new Error(`There is no contact with id ${id}`);

			const existingContactEmail = await context.prisma.contact.findUnique({
				where: {
					email,
				},
			});
	
			if (existingContactEmail)
				throw new Error(`There is already a contact with email ${email}`);

			const contact = await context.prisma.contact.update({
				where: {
					id,
				},
				data: {
					name,
					email,
					phone,
				},
			});

			return contact;
		},
		async deleteContact(obj, { id, }, context: ContextInterface): Promise<ContactInterface> {
			const existingContact = await context.prisma.contact.findUnique({
				where: {
					id,
				},
			});

			if (!existingContact)
				throw new Error(`There is no contact with id ${id}`);
			
			const contact = await context.prisma.contact.delete({
				where: {
					id,
				},
			});

			return contact;
		},
	},
};