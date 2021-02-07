import React, { useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";
import "../styles/infinitiScroll.css";

const BASEURL = "https://jsonplaceholder.typicode.com/photos";

export const InfinitiScroll = () => {
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	const oserver = useRef();

	const lastImg = useCallback(
		(node) => {
			if (loading) return;
			if (oserver.current) oserver.current.disconnect(); // remove oserver for last element
			oserver.current = new IntersectionObserver((e) => {
				if (e[0].isIntersecting) {
					// scroll to bottom
					if (page === 5) return;
					setPage((page) => page + 1);
				}
			});
			if (node) oserver.current.observe(node);
		},
		[loading]
	);

	const getUploadedPhoto = useCallback(async () => {
		const res = await axios.get(
			`${BASEURL}?_page=${page}&_limit=${page === 5 ? 5 : 25}`
		);
		setPhotos([...photos, ...res.data]);
		setLoading(false);
	}, [page]);

	useEffect(() => {
		setLoading(true);
		getUploadedPhoto();
	}, [page, getUploadedPhoto, setLoading]);

	return (
		<div className="infinity-scroll">
			{photos.map((e, i) =>
				photos.length === i + 1 ? (
					<div className="img-container" key={i}>
						<img src={e.url} size="small" ref={lastImg} />
						<span>{i + 1}</span>
					</div>
				) : (
					<div className="img-container" key={i}>
						<img src={e.url} size="small" />
						<span>{i + 1}</span>
					</div>
				)
			)}
			{loading && (
				<div className="loading">
					<div className="lds-ellipsis">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
		</div>
	);
};
