const SidebarSkeleton = () => {
  const skeletonContacts = Array(6).fill(null);

  return (
    <aside
      className="h-87% w-18 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      <div className="w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
