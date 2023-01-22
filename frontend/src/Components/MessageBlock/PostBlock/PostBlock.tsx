import React from 'react';
import {PostsResponse} from "../../../types";
import {Avatar, Grid, Card, Box, Typography} from "@mui/material";
import dayjs from "dayjs";

const PostBlock: React.FC<PostsResponse> = ({index, datetime,message, author}) => {
	const now = new Date();
	const today = now.toISOString();
	let date = '';

	const differanceByDays = dayjs(datetime).diff(dayjs(today), 'd');
	const differanceByYears = dayjs(datetime).diff(dayjs(today), 'y')


	if (differanceByDays === 0){
		date ='Today at ' + dayjs(datetime).format('HH:mm:ss');
	}
	if (differanceByDays === -1){
		date = 'Yesterday'
	}
	if (differanceByDays < -1){
		date = dayjs(datetime).format('DD.MM')
	}
	if (differanceByYears <= -1){
		date = dayjs(datetime).format('DD.MM.YYYY')
	}

	return (
		<Box m={2} boxShadow={5}>
		<Card>
			<Grid container direction='row' spacing={2}>
				<Grid container direction='column' item xs={2} alignItems='center'>
						<Avatar src='/broken-image.jpg' sx={{width: 50, height: 50}}></Avatar>
						<h2> {author} </h2>
				</Grid>
				<Grid item xs={10} borderBottom={1}>
				<Grid item xs={12} textAlign='right' margin='normal'>
					<Typography fontWeight='bold'>Post #{index}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography>{message}</Typography>
				</Grid>
				</Grid>
				<Grid item xs={12} textAlign='right'>
					<Typography fontStyle='italic'> {date} </Typography>
				</Grid>
			</Grid>
		</Card>
		</Box>
	);
};

export default PostBlock;