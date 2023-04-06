//Mock
const generateFeeds = () => {
    const feeds = [];

    for (let i = 0; i < 50; i++) {
        const randomTitle = `Feed ${i + 1}`;
        const randomUrl = `#${i + 1}`;
        feeds.push({title: randomTitle, url: randomUrl});
    }

    return feeds;
};
const Feed = () => {
    const feeds = generateFeeds();

    return (
        <div className="feed">
            <ul>
                <ul>
                    {feeds.map((feed, index) => (
                        <li key={index} className="feed-title">
                            <a href={feed.url}>{feed.title}</a>
                        </li>
                    ))}
                </ul>
            </ul>
        </div>
    );
};

export default Feed