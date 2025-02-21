export const ChatHeader = () => {
  return (
    <div className="px-4 py-3 border-b border-base-300 bg-base-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
          C
        </div>
        <div>
          <h3 className="font-medium text-sm">Crush</h3>
          <p className="text-xs text-base-content/70">Online</p>
        </div>
      </div>
    </div>
  );
};
