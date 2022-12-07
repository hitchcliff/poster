interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="font-mulish text-dark text-lg overflow-x-hidden">
      {children}
    </div>
  );
};

export default Layout;
