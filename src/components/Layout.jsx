import BottomNav from "./BottomNav";

export default function Layout({ title, iconSrc, active, children }) {
  return (
    <div className="relative min-h-screen bg-[#F6F6F6] font-['Noto_Sans_KR'] flex flex-col">
      {/* Header (공통) */}
      <header className="fixed top-0 left-0 w-full z-20 bg-[#FEFDFC] shadow-sm shadow-black/10 flex justify-center items-center py-6">
        <div className="flex items-center space-x-2">
          {iconSrc && (
            <img src={iconSrc} alt="icon" className="w-7 h-7" />
          )}
          <span className="text-xl font-medium text-black">{title}</span>
        </div>
      </header>

      {/* Main Scroll Area */}
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#F6F6F6] mt-[84px] mb-[72px]">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full z-20">
        <BottomNav active={active} />
      </div>
    </div>
  );
}
