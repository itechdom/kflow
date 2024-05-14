/**
 * Renders an icon using the Material Icons library.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the icon.
 * @returns {JSX.Element} The rendered icon component.
 */
export const Icon = ({ children }) => {
  return <i className="material-icons">{children}</i>;
};