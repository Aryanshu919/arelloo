import { Copyright, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Arello
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              The ultimate project management platform for teams to collaborate and achieve their goals.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Community</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Status</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Copyright className="w-4 h-4" />
                <span>2024 Arello. All rights reserved.</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            </div>
          </div>
          
          <div className="text-center mt-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;