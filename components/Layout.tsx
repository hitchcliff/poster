interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className="font-mulish text-dark text-lg">{children}</div>;
};

export default Layout;
