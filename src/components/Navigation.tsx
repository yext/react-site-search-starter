import classNames from 'classnames';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as KebabIcon } from '../icons/kebab.svg';
import { useComposedCssClasses, CompositionMethod } from '../hooks/useComposedCssClasses';
import { useAnswersState } from '@yext/answers-headless-react';

interface NavigationCssClasses {
  nav?: string,
  linksWrapper?: string,
  menuWrapper?: string,
  navLink?: string,
  navLink___active?: string,
  menuButton?: string,
  menuButtonContainer?: string,
  menuButton___menuOpen?: string,
  menuButton___hasActiveLink?: string,
  menuContainer?: string,
  menuNavLink?: string,
  menuNavLink___active?: string
}

const builtInCssClasses: NavigationCssClasses = {
  nav: 'border-b border-gray-200 text-gray-600 flex space-x-6 font-medium mb-6',
  navLink: 'whitespace-nowrap py-3 px-1 mt-1 font-medium text-md border-b-2 border-opacity-0 hover:border-gray-300',
  navLink___active: 'text-blue-600 border-blue-600 border-b-2 border-opacity-100 hover:border-blue-600',
  menuButtonContainer: 'relative flex flex-grow justify-end mr-4',
  menuButton: 'flex items-center text-gray-600 font-medium text-md my-1 p-3 border-opacity-0 rounded-md hover:bg-gray-200',
  menuButton___menuOpen: 'bg-gray-100 text-gray-800',
  menuButton___hasActiveLink: 'text-blue-600',
  menuContainer: 'absolute flex flex-col bg-white border top-14 py-2 rounded-lg shadow-lg',
  menuNavLink: 'text-gray-600 text-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-800 focus:text-gray-800',
  menuNavLink___active: 'text-blue-600 hover:text-blue-600 focus:text-blue-600'
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

  const { search } = useLocation();
  const visibleLinks = links.slice(0, links.length - numOverflowLinks);
  const overflowLinks = links.slice(-numOverflowLinks);
  let menuContainsActiveLink = false;
  overflowLinks.forEach(({ to }) => {
    if (to === currentVertical || (to === '/' && currentVertical === undefined)) {
      menuContainsActiveLink = true;
    }
  })
  let menuButtonClassNames = cssClasses.menuButton___menuOpen
    ? classNames(cssClasses.menuButton, {
      [cssClasses.menuButton___menuOpen]: menuOpen
    })
    : cssClasses.menuButton;
  menuButtonClassNames = cssClasses.menuButton___hasActiveLink
    ? classNames(menuButtonClassNames, {
      [cssClasses.menuButton___hasActiveLink]: menuContainsActiveLink
    })
    : menuButtonClassNames;
  return (
    <nav className={cssClasses.nav} ref={navigationRef}>
      {visibleLinks.map(l => renderLink(l, search, cssClasses))}
      {numOverflowLinks > 0 &&
        <div className={cssClasses.menuButtonContainer}>
          <button
            className={menuButtonClassNames}
            ref={menuRef}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <KebabIcon /> More
          </button>
          {menuOpen && 
            <div className={cssClasses.menuContainer}>
              {menuOpen && overflowLinks.map(l => renderLink(l, search, {
                navLink: cssClasses.menuNavLink,
                navLink___active: cssClasses.menuNavLink___active
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
  queryParams: string,
  cssClasses: { navLink?: string, navLink___active?: string }) 
{
  const { to, label } = linkData;
  return (
    <NavLink
      key={to}
      className={cssClasses.navLink}
      activeClassName={cssClasses.navLink___active}
      to={`${to}${queryParams}`}
      exact={true}
    >
      {label}
    </NavLink>
  )
}