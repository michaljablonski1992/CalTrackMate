import Nav from './nav/Nav';

interface Props {
  children: React.ReactNode;
}

const SidebarWrapper = ({ children }: Props) => {
  return (
    <div className="h-full w-full p-4 flex flex-col lg:flex-row">
      <Nav mode='mobile' />
      <Nav mode='desktop' />
      <main className="lg:h-full w-full flex overflow-scroll no-scroll h-[calc(100%-4rem)]">
        {children}
      </main>
    </div>
  );
};

export default SidebarWrapper;
