import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#3d2817] text-[#f5f1eb] py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8b6f47] to-[#c9a882] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">✝</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">HolyGround</h3>
                <p className="text-xs text-[#d4c4b0]">A Bible Social Community</p>
              </div>
            </div>
            <p className="text-[#d4c4b0] text-sm max-w-md">
              Connect with believers worldwide. Share verses, reflections, and grow together in faith through meaningful community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-[#d4c4b0] hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-[#d4c4b0] hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="text-[#d4c4b0] hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-[#d4c4b0] hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[#d4c4b0] hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#d4c4b0] hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-[#d4c4b0] hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[#d4c4b0] hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#5d4a2f] pt-8 text-center text-sm text-[#d4c4b0]">
          <p>&copy; {new Date().getFullYear()} HolyGround. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

