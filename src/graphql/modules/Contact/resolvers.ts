import ContactInterface from '../../../interfaces/ContactInterface';
import ContextInterface from '../../../interfaces/ContextInterface';

export default {
	Query: {
		contacts: async (obj, args, context: ContextInterface, info): Promise<ContactInterface[]> => {
			const contacts = await context.contactService.getAll();

			return contacts;
		},
	},

	Mutation: {
		createContact: async (obj, { data, }, context: ContextInterface): Promise<ContactInterface> => {
			const contact = await context.contactService.create(data);

			return contact;
		},
		updateContact: async (obj, { id, data, }, context: ContextInterface): Promise<ContactInterface> => {
			const contact = await context.contactService.update(id, data);
			
			return contact;
		},
		deleteContact: async (obj, { id, }, context: ContextInterface): Promise<ContactInterface> => {
			const contact = await context.contactService.delete(id);
	
			return contact;
		},
	},
};