
import { Button } from '@/components/ui/button';
import {FolderKanban, Search} from 'lucide-react';
import { useSelector , useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { logout } from '@/slices /authSlice';
import { toast } from 'sonner';


const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated} = useSelector((state: RootState) => state.auth);
  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Arello
              </h1>
            </Link>

            { isAuthenticated &&
               <nav className="hidden md:flex items-center space-x-6 ml-8">
              <Link to="/boards" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
                <FolderKanban className="w-4 h-4 " />
                <span>Boards</span>
              </Link>
            </nav>}
          </div>

          {/* Search Bar */}
         { isAuthenticated &&
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search boards, cards, and more..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>}

          {/* Action Buttons */}
          { isAuthenticated  && <Link to= "/signin">
                <Button size="sm" onClick={() => { 
                    dispatch(logout());
                    toast.success("user logout successfully")
                    }}>
                  Logout
                </Button>
            </Link> }

        {
            !isAuthenticated && 
                <div className="flex items-center bg-amber-50 space-x-3">
            <Link to= "/signin">
                <Button size="sm">
                Login
                </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">
                Register
              </Button>
            </Link>
          </div>
        }
        
        </div>
      </div>
    </header>
  );
};

export default Header;