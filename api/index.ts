import express = require("express");
import fileDb from "./fileDb";
import messagesRouter from "./routers/messages";
import cors = require("cors");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/messages', messagesRouter);

const run = async () => {
	await fileDb.init();
	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
};

run().catch(console.error);