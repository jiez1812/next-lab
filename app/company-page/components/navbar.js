/**
 * 导航栏组件
 * @param {string} brandName - Brand Name
 * @param {Array} navigationItems - NavItems, link and name are required
 * @returns {JSX.Element} - rendered Navbar
 */

export default function Navbar({brandName, navigationItems = []}){
    return(
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">{brandName}</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {navigationItems.map((item, index) => (
                            <li key={index}>
                                <a className={`${item.link}`}>{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}