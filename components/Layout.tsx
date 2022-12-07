interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className="font-mulish">{children}</div>;
};

export default Layout;
