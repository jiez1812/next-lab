'use client'
// Create a card that will display the date and festival name
// Use the date and festival name from the dateDay prop
import Link from 'next/link';
import { useColor } from '../context/ColorContext';

export default function OptionCard({dateDay}) {
    const { displayColor } = useColor();
      const handleMouseEnter = (e) => {
        e.currentTarget.style.boxShadow = `0 0 25px ${displayColor}80`;
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        // 在hover时改变标题颜色
        const title = e.currentTarget.querySelector('h2');
        if (title) {
            title.style.color = displayColor;
        }
    };
      const handleMouseLeave = (e) => {
        e.currentTarget.style.boxShadow = `0px 0px 15px ${displayColor}40`;
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        // 离开hover时设置为深灰色
        const title = e.currentTarget.querySelector('h2');
        if (title) {
            title.style.color = '#525252';
        }
    };
    
    return(
        <div 
            className="card group w-80 transition-all duration-300 ease-in-out relative z-1 cursor-pointer"
            style={{ 
                boxShadow: `0px 0px 15px ${displayColor}40`,
                transition: 'all 0.3s ease-in-out'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={`/countdown/${dateDay.festivalName}`}>
                <div className="card-body bg-base-100 rounded-2xl">                    <h2 
                        className="card-title transition-colors duration-300"
                        style={{ color: '#525252' }}
                    >
                        {dateDay.festivalName}
                    </h2>
                    <div className="text-base-content/70">
                        {dateDay.festivalDate}
                    </div>
                </div>
            </Link>
        </div>
    )
}