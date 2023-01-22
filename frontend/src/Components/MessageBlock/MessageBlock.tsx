import React, {useEffect, useState} from 'react';
import {PostsResponse} from "../../types";
import PostBlock from "./PostBlock/PostBlock";
import axiosApi from "../../axios-api";

const MessageBlock = () => {
		const [posts, setPosts] = useState<PostsResponse[]>([]);

		let url = 'messages';

		useEffect(() => {
			setInterval(() => {
				const fetchData = async (urlValue: string) => {
					const response = await axiosApi.get(urlValue);
					const postsResponse: PostsResponse[] = response.data;
					if (postsResponse.length > 0) {
						url = 'messages?datetime=' + postsResponse[postsResponse.length - 1]?.datetime
						setPosts(prev => (prev.concat(postsResponse).reverse()));
					}
				};
				fetchData(url).catch(e => console.error(e))
			}, 2000)

		}, []);
		return (
			<div>
				{(posts.length < 1)? <h1>There is no posts yet</h1> : posts.map((item, index) => (
						<div key={Math.random()}>
							<PostBlock message={item.message} author={item.author} datetime={item.datetime} index={index}/>
						</div>))}
			</div>
		);
	}
;

export default MessageBlock;