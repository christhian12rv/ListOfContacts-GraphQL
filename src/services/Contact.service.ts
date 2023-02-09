import { PrismaClient } from '@prisma/client';
import ContactInterface from '../interfaces/ContactInterface';

class ContactService {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public async getAll(): Promise<ContactInterface[]> {
		const contacts = await this.prisma.contact.findMany();
		return contacts;
	}

	public async create(data): Promise<ContactInterface> {
		const { name, email, phone, } = data;

		const existingContact = await this.prisma.contact.findUnique({
			where: {
				email,
			},
		});

		if (existingContact)
			throw new Error(`There is already a contact with email ${email}`);

		const contact = await this.prisma.contact.create({
			data: {
				name,
				email,
				phone,
			},
		});

		return contact;
	}

	public async update(id, data): Promise<ContactInterface> {
		const { name, email, phone, } = data;

		const existingContactId = await this.prisma.contact.findUnique({
			where: {
				id,
			},
		});

		if (!existingContactId)
			throw new Error(`There is no contact with id ${id}`);

		const existingContactEmail = await this.prisma.contact.findUnique({
			where: {
				email,
			},
		});

		if (existingContactEmail)
			throw new Error(`There is already a contact with email ${email}`);

		const contact = await this.prisma.contact.update({
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
	}

	public async delete(id): Promise<ContactInterface> {
		const existingContact = await this.prisma.contact.findUnique({
			where: {
				id,
			},
		});

		if (!existingContact)
			throw new Error(`There is no contact with id ${id}`);
		
		const contact = await this.prisma.contact.delete({
			where: {
				id,
			},
		});

		return contact;
	}
}

export default ContactService;