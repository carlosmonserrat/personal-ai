import {Inter} from 'next/font/google'
import TopNav from "@/components/top-nav";
import Menu from "@/components/menu";
import InputPrompt from "@/components/input-prompt";
import Conversations from "@/components/conversations";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <div className="dashboard">
            <TopNav/>
            <Menu/>
            <main className="content">
                <Conversations/>
                <InputPrompt></InputPrompt>
            </main>
        </div>
    )
}
