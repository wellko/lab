import React from 'react';
import PostForm from "./Components/PostForm/PostForm";
import MessageBlock from "./Components/MessageBlock/MessageBlock";
import {Container} from "@mui/material";

function App() {
	return (
		<Container color='#c5c5c5'>
			<PostForm/>
			<MessageBlock/>
		</Container>
	);
}

export default App;
