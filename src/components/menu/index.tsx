import Feed from "@/components/feed";

const Menu = () => {
    return (
        <aside className="left-menu">
            <div className="menu-content">
                <h3>📰 News</h3>
                <ul>
                    <li><a href="/bolivia">Bolivia</a></li>
                    <li><a href="#">Chile</a></li>
                    <li><a href="#">Russia</a></li>
                </ul>
                <Feed/>
            </div>
        </aside>
    );
};

export default Menu