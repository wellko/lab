import express = require("express");
import fileDb from "../fileDb";
import {SendData} from "../types";

const messagesRouter = express.Router();

messagesRouter.get('/', (async (req, res) => {
	const queryDate = req.query.datetime as string;

	if (queryDate) {
		const date = new Date(queryDate);
		if (isNaN(date.getDate())) {
			const response = {error: 'Author and message must be present in the request'};
			res.status(400).send(JSON.stringify(response));
		}else {
			const afterTimeMessages = await fileDb.getItemsAfterDate(queryDate)
			res.send(afterTimeMessages);
		}

	} else {
		const allMessages = await fileDb.getItems();
		res.send(allMessages);
	}
}))

messagesRouter.post('/', async (req, res) => {
	if(req.body.author && req.body.message.length){
		const message:SendData = {
			author: req.body.author,
			message: req.body.message
		}
		const response = await fileDb.addItem(message);
		res.send(response);
	}else {
		const errorText = {error: 'Author and message must be present in the request'};
		res.status(400).send(errorText)
	}

})


export default messagesRouter;