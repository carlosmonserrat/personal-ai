import {fetchFeedContent} from "@/lib/scraper";

interface FeedItem {
    title: string;
    author: string;
    content: string;
}

interface Props {
    feedItems: FeedItem[];
}

export async function getStaticProps() {
    const baseUrl = 'https://www.paginasiete.bo';
    const feedItems = await fetchFeedContent(baseUrl);

    return {
        props: {
            feedItems,
        },
    };
}

export default function Bolivia({feedItems}: Props) {
    return (
        <div>
            <h1>Bolivia</h1>
            <ul>
                {feedItems.map((item) => (
                    <li key={item.title}>
                        <h2 className="text-2xl">{item.title}</h2>
                        <br/>
                        <h2>{item.author}</h2>
                        <br/>
                        <p>{item.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}