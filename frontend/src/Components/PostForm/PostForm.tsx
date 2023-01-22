import React, {useState} from 'react';
import {Posts} from "../../types";
import Button from '@mui/material/Button';
import {Box, CircularProgress, TextField} from "@mui/material";
import axiosApi from "../../axios-api";

const PostForm = () => {

	const [post, setPost] = useState<Posts>({
		author: '',
		message: '',
	})

	const [loading, setLoading] = useState<boolean>(false);

	const postMessage = async (e: React.FormEvent,) => {
		e.preventDefault();
		try {
            setLoading(true);
			await axiosApi.post('/messages', {
				message: post.message,
				author: post.author
			})
			setPost(prev => ({...prev, message: ''}))
		}
        finally {
            setLoading(false);
        }
	}

	const messageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPost(prev => ({...prev, message: e.target.value}))
	}

	const authorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPost(prev => ({...prev, author: e.target.value}))
	}


	return (
		<Box border={2} borderRadius={2} borderColor='#c5c5c5'>
			<form onSubmit={postMessage}>
				<TextField required fullWidth label="Author Name: " id="fullWidth" onChange={authorChange} value={post.author}
						   margin='normal'/>
				<TextField required fullWidth label="Message: " id="fullWidth" onChange={messageChange} value={post.message}
						   margin='normal'/>
				<Button type='submit' variant='contained'>{loading? <CircularProgress size={20} color='inherit'/> : 'Post'}</Button>
			</form>
		</Box>
	);
};

export default PostForm;