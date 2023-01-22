import { promises as fs } from 'fs';
import {Message, SendData} from "./types";

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
        return data;
    },

    async addItem(item: SendData) {
        const id = crypto.randomUUID();


        const product = {id, ...item};
        data.push(product);
        await this.save();
        return product;
    },

    async save() {
        return fs.writeFile(filename, JSON.stringify(data));
    }
};

export default fileDb;