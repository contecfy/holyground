import React from 'react';
import MobileBottomNav from '@/components/navigation/mobile-bottom-nav';
import MobileHeader from '@/components/navigation/mobile-header';
import DesktopSidebar from '@/components/navigation/desktop-sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Mobile Header */}
      <MobileHeader />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <DesktopSidebar />
        
        {/* Main Content */}
        <main className="flex-1 pb-16 md:pb-0 pt-0 md:pt-0">
          <div className="w-full px-4 py-6 md:px-6">
            {children}
          </div>
        </main>
        
        {/* Right Sidebar - Desktop Only */}
        <aside className="hidden lg:block w-80 p-6">
          <div className="sticky top-6 space-y-6">
            {/* Trending Topics Widget */}
            <div className="bg-white border border-[#d4c4b0] rounded-lg p-4">
              <h3 className="font-bold text-[#3d2817] mb-3">Trending Topics</h3>
              <div className="space-y-2">
                {['Doctrine', 'Apologetics', 'Daily Devotionals', 'Relationships'].map((topic) => (
                  <button
                    key={topic}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#f5f1eb] transition-colors text-sm text-[#6b5d4a] hover:text-[#5d4a2f]"
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Who to Follow */}
            <div className="bg-white border border-[#d4c4b0] rounded-lg p-4">
              <h3 className="font-bold text-[#3d2817] mb-3">Who to Follow</h3>
              <div className="space-y-3">
                {[
                  { name: 'Pastor John', username: 'pastorjohn', rep: '3.4k' },
                  { name: 'Dr. Elizabeth', username: 'elizabetht', rep: '2.8k' },
                  { name: 'Rev. James', username: 'revjames', rep: '4.2k' }
                ].map((user) => (
                  <div key={user.username} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#8b6f47] to-[#5d4a2f] rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-[#3d2817]">{user.name}</p>
                        <p className="text-xs text-[#6b5d4a]">@{user.username} • {user.rep} rep</p>
                      </div>
                    </div>
                    <button className="text-xs px-3 py-1 bg-[#5d4a2f] text-white rounded-md hover:bg-[#3d2817] transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}

