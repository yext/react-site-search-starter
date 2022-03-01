import classNames from 'classnames';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as KebabIcon } from '../icons/kebab.svg';
import { useComposedCssClasses, CompositionMethod } from '../hooks/useComposedCssClasses';
import { useAnswersState } from '@yext/answers-headless-react';
import { useQueryParam } from '../hooks/useQueryParam';

interface NavigationCssClasses {
  nav?: string,
  linksWrapper?: string,
  menuWrapper?: string,
  navLinkContainer?: string,
  navLinkContainer___active?: string,
  navLinkContainer___inActive?: string,
  navLink?: string,
  kebabIcon?: string,
  menuButton?: string,
  menuButtonContainer?: string,
  menuButton___menuOpenNoActiveLink?: string,
  menuButton___menuOpenHasActiveLink?: string,
  menuButton___menuClosedHasActiveLink?: string,
  menuButton___menuClosedNoActiveLink?: string,
  menuContainer?: string,
  menuNavLink?: string,
  menuNavLinkContainer?: string,
  menuNavLinkContainer___active?: string,
  menuNavLinkContainer___inActive?: string
}

const builtInCssClasses: NavigationCssClasses = {
  nav: 'border-b border-gray-200 text-gray-600 flex space-x-6 font-medium mb-6',
  navLinkContainer: 'whitespace-nowrap py-3 mt-1 font-medium text-md border-b-2 hover:border-gray-300',
  navLink: 'py-3 px-2',
  navLinkContainer___active: 'text-blue-600 border-blue-600 hover:border-blue-600',
  navLinkContainer___inActive: 'border-transparent',
  kebabIcon: 'pointer-events-none',
  menuButtonContainer: 'relative flex flex-grow justify-end mr-4',
  menuButton: 'flex items-center font-medium text-md h-12 mt-1 p-3 rounded-md hover:bg-gray-200',
  menuButton___menuOpenNoActiveLink: 'bg-gray-100 text-gray-800',
  menuButton___menuOpenHasActiveLink: 'bg-gray-100 text-blue-600',
  menuButton___menuClosedHasActiveLink: 'text-blue-600',
  menuButton___menuClosedNoActiveLink: 'text-gray-600',
  menuContainer: 'absolute flex-col bg-white border top-14 py-2 rounded-lg shadow-lg',
  menuNavLink: 'px-4 py-2 flex-grow',
  menuNavLinkContainer: 'flex hover:bg-gray-100 text-lg',
  menuNavLinkContainer___active: 'text-blue-600 hover:text-blue-600 focus:text-blue-600',
  menuNavLinkContainer___inActive: 'text-gray-600 hover:text-gray-800 focus:text-gray-800'
}

interface LinkData {
  to: string,
  label: string
}

interface NavigationProps {
  links: LinkData[],
  customCssClasses?: NavigationCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function Navigation({ links, customCssClasses, cssCompositionMethod }: NavigationProps) {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const currentVertical = useAnswersState(state => state.vertical.verticalKey);
  const queryParam = useQueryParam();

  // Close the menu when clicking the document
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const handleDocumentClick = (e: MouseEvent) => {
    if (e.target !== menuRef.current) {
      setMenuOpen(false);
    }
  };
  useLayoutEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Responsive tabs
  const [numOverflowLinks, setNumOverflowLinks] = useState<number>(0);
  const navigationRef = useRef<HTMLDivElement>(null);
  const handleResize = useCallback(() => {
    const navEl = navigationRef.current;
    if (!navEl) {
      return;
    }
    const isOverflowing = navEl.scrollWidth > navEl.offsetWidth;
    if (isOverflowing && numOverflowLinks < links.length) {
      setNumOverflowLinks(numOverflowLinks + 1);
    }
  }, [links.length, numOverflowLinks])
  useLayoutEffect(handleResize, [handleResize]);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    function resizeListener() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setNumOverflowLinks(0);
        handleResize()
      }, 50)
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [handleResize]);

  const visibleLinks = links.slice(0, links.length - numOverflowLinks);
  const overflowLinks = links.slice(-numOverflowLinks);
  const isActiveLink = ({ to }: LinkData) => to === currentVertical || (to === '/' && currentVertical === undefined)
  const activeVisibleLinkIndex = visibleLinks.findIndex(isActiveLink);
  const activeMenuLinkIndex = overflowLinks.findIndex(isActiveLink);
  const menuContainsActiveLink = activeMenuLinkIndex >= 0;
  const menuButtonClassNames = classNames(cssClasses.menuButton, {
    [cssClasses.menuButton___menuOpenNoActiveLink ?? '']: menuOpen && !menuContainsActiveLink,
    [cssClasses.menuButton___menuOpenHasActiveLink ?? '']: menuOpen && menuContainsActiveLink,
    [cssClasses.menuButton___menuClosedHasActiveLink ?? '']: !menuOpen && menuContainsActiveLink,
    [cssClasses.menuButton___menuClosedNoActiveLink ?? '']: !menuOpen && !menuContainsActiveLink
  });

  return (
    <nav className={cssClasses.nav} ref={navigationRef}>
      {visibleLinks.map((l, index) => renderLink(l, queryParam, index === activeVisibleLinkIndex, cssClasses))}
      {numOverflowLinks > 0 &&
        <div className={cssClasses.menuButtonContainer}>
          <button
            className={menuButtonClassNames}
            ref={menuRef}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <KebabIcon className={cssClasses.kebabIcon} /> More
          </button>
          {menuOpen && 
            <div className={cssClasses.menuContainer}>
              {menuOpen && overflowLinks.map((l, index) => renderLink(l, queryParam, index === activeMenuLinkIndex, {
                navLink: cssClasses.menuNavLink,
                navLinkContainer: cssClasses.menuNavLinkContainer,
                navLinkContainer___active: cssClasses.menuNavLinkContainer___active,
                navLinkContainer___inActive: cssClasses.menuNavLinkContainer___inActive
              }))}
            </div>
          }
        </div>
      }
    </nav>
  )
}

function renderLink(
  linkData: LinkData,
  query: string | null,
  isActiveLink: boolean,
  cssClasses: {
    navLinkContainer?: string,
    navLinkContainer___active?: string,
    navLinkContainer___inActive?: string,
    navLink?: string
  }) 
{
  const { to, label } = linkData;
  const navLinkContainerClasses = classNames(cssClasses.navLinkContainer, {
    [cssClasses.navLinkContainer___inActive ?? '']: !isActiveLink,
    [cssClasses.navLinkContainer___active ?? '']: isActiveLink
  });
  
  const path = query !== null ? `${to}?query=${query}` : to;

  return (
    <div className={navLinkContainerClasses} key={to}>
      <NavLink
        className={cssClasses.navLink}
        to={path}
        exact={true}
      >
        {label}
      </NavLink>
    </div>
  )
}