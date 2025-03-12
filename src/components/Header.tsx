
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Database, ArrowLeft, Plus, Book, MessageSquare } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  
  return (
    <header className="w-full border-b backdrop-blur-sm bg-white/70 dark:bg-black/10 sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/90 flex items-center justify-center">
              <Database className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">KnowEx</h1>
              <p className="text-xs text-muted-foreground">Knowledge Builder & Explorer</p>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-1 mr-2">
            <Link to="/app">
              <Button 
                variant={pathname === '/app' ? 'default' : 'ghost'} 
                size="sm"
                className="gap-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>Build KB</span>
              </Button>
            </Link>
            
            <Link to="/datasets">
              <Button 
                variant={pathname === '/datasets' ? 'default' : 'ghost'} 
                size="sm"
                className="gap-1.5"
              >
                <Database className="h-4 w-4" />
                <span>Datasets</span>
              </Button>
            </Link>
            
            <Link to="/knowledge-bases">
              <Button 
                variant={pathname === '/knowledge-bases' ? 'default' : 'ghost'} 
                size="sm"
                className="gap-1.5"
              >
                <Book className="h-4 w-4" />
                <span>Knowledge Bases</span>
              </Button>
            </Link>
            
            {pathname.startsWith('/chat/') && (
              <Button 
                variant="default" 
                size="sm"
                className="gap-1.5"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </Button>
            )}
          </nav>
          
          {/* Home/Back Button */}
          {pathname !== '/' ? (
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Home
              </Button>
            </Link>
          ) : (
            <Link to="/app">
              <Button className="gap-1.5">
                <Plus className="h-4 w-4" />
                <span>Get Started</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
