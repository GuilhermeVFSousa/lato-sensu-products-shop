import React, { useEffect, useRef, useCallback, useState } from 'react';
import style from './MainPage.module.css';
import { Outlet } from 'react-router';
import { Link } from 'react-router';

interface NavItem {
    id: string;
    icon: string;
    text: string;
    route: string;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

export const MainPage: React.FC = () => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const menuToggleRef = useRef<HTMLButtonElement>(null);
    const [sideBarState, setSideBarState] = useState<boolean>(true);
    

    const toggleSidebar = useCallback(() => {
        setSideBarState(true)
    }, []);

    const handleNavItemClick = useCallback((event: Event) => {
        const target = event.target as HTMLElement;
        const navItem = target.closest('.navItem') as HTMLElement | null;

        if (navItem) {
            document.querySelectorAll('.navItem').forEach(item => {
                item.classList.remove('active');
            });

            navItem.classList.add('active');

            if (window.innerWidth <= 1024) {
                setSideBarState(false)
            }
        }
    }, []);

    const handleClickOutside = useCallback((event: Event) => {
        const target = event.target as HTMLElement;

        if (
            window.innerWidth <= 1024 &&
            sidebarRef.current &&
            menuToggleRef.current &&
            !sidebarRef.current.contains(target) &&
            !menuToggleRef.current.contains(target)
        ) {
            setSideBarState(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        const navItems = document.querySelectorAll('.navIitem');
        navItems.forEach(item => {
            item.addEventListener('click', handleNavItemClick);
        });

        return () => {
            document.removeEventListener('click', handleClickOutside);
            navItems.forEach(item => {
                item.removeEventListener('click', handleNavItemClick);
            });
        };
    }, [handleClickOutside, handleNavItemClick]);

    const navigationSections: NavSection[] = [
        {
            title: 'Navegação',
            items: [
                { id: 'home', icon: '🏠', text: 'Início', route: '/home' },
                { id: 'products', icon: '🛍️', text: 'Produtos', route: '/products' }
            ]
        }
    ];

    const renderNavItem = (item: NavItem, isActive: boolean = false) => (
        <div
            key={item.id}
            className={`navItem ${isActive ? 'active' : ''}`}
            data-nav-id={item.id}
        >
            <span className={style.navIcon || "nav__icon"}>{item.icon}</span>
            <span className={style.navText || "nav__text"}>{item.text}</span>
        </div>
    );

    return (
        <div className={style.main}>

            <div className={style.appContainer || 'app-container'}>
                <header className={style.header || 'header'}>
                    <button
                        ref={menuToggleRef}
                        className={style.menuToggle || 'menu-toggle'}
                        onClick={toggleSidebar}
                        type="button"
                        aria-label="Toggle sidebar"
                    >
                        ☰
                    </button>
                    <h1 className={style.headerTitle || 'header__title'}>Products Shop</h1>
                    <div className={style.headerActions || 'header__actions'}>
                        <div className={style.headerUser || 'header__user'}>
                            <div className={style.headerAvatar || 'header__avatar'}>JD</div>
                            <span className={style.headerUsername || 'header__username'}>João Silva</span>
                        </div>
                    </div>
                </header>

                <aside
                    ref={sidebarRef}
                    className={sideBarState ? style.sidebar : style.sidebarClosed}
                    id="sidebar"
                >
                    <nav className={style.sidebarNav || 'sidebar__nav'}>
                        {navigationSections.map((section, sectionIndex) => (
                            <div key={section.title} className={style.navSection || 'nav__section'}>
                                <h3 className={style.navTitle || 'nav__title'}>{section.title}</h3>
                                {section.items.map((item, itemIndex) =>
                                <Link to={item.route}>
                                    {renderNavItem(item, sectionIndex === 0 && itemIndex === 0)}
                                </Link>
                                )}
                            </div>
                        ))}
                    </nav>
                </aside>

                <main className={style.mainContent || 'main-content'}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};