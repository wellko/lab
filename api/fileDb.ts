import {promises as fs} from 'fs';
import {Message, SendData} from "./types";
import {randomUUID} from "crypto";

const filename = './db.json';

let data: Message[] = [];

const fileDb = {
	async init() {
		try {
			const fileContents = await fs.readFile(filename);
			data = JSON.parse(fileContents.toString());
		} catch (e) {
			data = [];
		}
	},

	async getItems() {
		if (data.length > 30) {
			return data.slice(-30);
		}
		return data;
	},

	async getItemsAfterDate(date: string) {
		return data.filter(element => element.datetime > date)
	},

	async addItem(item: SendData) {
		const id = randomUUID();
		const date = new Date();
		const datetime = date.toISOString();
		const message = {id, datetime, ...item};
		data.push(message);
		await this.save();
		return message
	},

	async save() {
		return fs.writeFile(filename, JSON.stringify(data));
	}
};

export default fileDb;