/**
 * 导航栏组件
 * @param {string} brandName - Brand Name
 * @param {Array} navigationItems - NavItems, link and name are required
 * @returns {JSX.Element} - rendered Navbar
 */

import Link from 'next/link';
import ThemeChanger from  './themeChanger';

function NavBarList({navigationItems}){
    return(
        <>
            {navigationItems.map((item, index)=>(
                <li key={index}>
                    <Link href={`${item.link}`}>{item.name}</Link>
                </li>
            ))}
            <li>
                <ThemeChanger/>
            </li>
        </>
    )
}

export default function Navbar({brandName, navigationItems = []}){
    return(
        <>
            <div className="navbar bg-base-100 sticky top-0 z-50 lg:static lg:z-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <NavBarList navigationItems={navigationItems}/>
                        </ul>
                    </div>
                    <Link className="btn btn-ghost text-xl" href="/company-page">{brandName}</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        <NavBarList navigationItems={navigationItems}/>
                    </ul>
                </div>
            </div>
        </>
    );
}