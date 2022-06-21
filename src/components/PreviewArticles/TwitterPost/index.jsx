import React, { useEffect } from 'react';
import { Markup } from 'interweave';
import axios from 'axios';
// import twitterCall from '../../../globalServices/globalService';

const TwitterPost = () => {
	// const url = 'https://twitter.com/433/status/1529108545664438276';

	process.env.REACT_APP_INSTA_APP_ID = '467967928127124';
	process.env.REACT_APP_INSTA_CLIENT_ID = '65fba6088f5adc04af7c85dff017918b';

	useEffect(() => {
		twitterCall();
	}, []);

	const twitterCall = async () => {
		try {
			const abc = await axios.get(
				// `https://publish.twitter.com/oembed?url=${url}`,
				`https://graph.facebook.com/v14.0/instagram_oembed?access_token={process.env.REACT_APP_INSTA_APP_ID}|{process.env.REACT_APP_INSTA_CLIENT_ID}&format=json&method=get&url=https://www.instagram.com/p/Ce6NMSPLDU4/&&omit_script=true`,
				{
					headers: {
						'Access-Control-Allow-Origin': '*'
					}
				}
			);
			console.log(abc, '==============');
		} catch (e) {
			console.log(e, 'e');
		}
	};

	return (
		<>
			<Markup
				content={
					'<blockquote class="twitter-tweet" data-width="220" data-theme="dark"><p lang="en" dir="ltr">Happy 50th anniversary to the Wilderness Act! Here&#39;s a great wilderness photo from <a href="https://twitter.com/YosemiteNPS?ref_src=twsrc%5Etfw">@YosemiteNPS</a>. <a href="https://twitter.com/hashtag/Wilderness50?src=hash&amp;ref_src=twsrc%5Etfw">#Wilderness50</a> <a href="http://t.co/HMhbyTg18X">pic.twitter.com/HMhbyTg18X</a></p>&mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/507185938620219395?ref_src=twsrc%5Etfw">September 3, 2014</a></blockquote>n'
				}
			/>

			{/* <div
				dangerouslySetInnerHTML={{
					__html:
						'<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">WE ARE :five::zero: MILLION on Instagram! :yellow_heart:<br><br>The journey continues..:pray: <a href="https://t.co/XoIGUd8vdA">pic.twitter.com/XoIGUd8vdA</a></p>&mdash; 433 (@433) <a href="https://twitter.com/433/status/1529108545664438276?ref_src=twsrc%5Etfw">May 24, 2022</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n'
				}}
			/> */}
		</>
	);
};
export default TwitterPost;

// TwitterPost.propTypes = {
// 	url: PropTypes.string.isRequired
// };
