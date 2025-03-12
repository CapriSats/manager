
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Database, BarChart3, Layers, BrainCircuit, ArrowRight, MessageSquare, Book } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import { Card, CardContent } from '@/components/ui/card';

const Landing = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      {/* Particle animation background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1">
        {/* Header/Navigation */}
        <header className="w-full py-4 px-6 md:px-12 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">KnowEx</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Features</a>
              <a href="#workflow" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Workflow</a>
              <Link to="/datasets" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1.5">
                <Database className="h-4 w-4" />
                Datasets
              </Link>
              <Link to="/knowledge-bases" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1.5">
                <Book className="h-4 w-4" />
                Knowledge Bases
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/knowledge-bases" className="hidden sm:block">
                <Button variant="outline" className="rounded-full gap-1.5 border-primary/20 hover:border-primary/30">
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat</span>
                </Button>
              </Link>
              <Link to="/app">
                <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white transition-colors">
                  Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero section */}
        <section className="pt-20 pb-32 px-6 md:px-12 flex items-center justify-center">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 opacity-80">
              <p className="inline-block py-1 px-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm">Text Data Preprocessing</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-400">
              ITSM Knowledge
              <br />
              Enhancement Platform
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              Transform raw ITSM data into enriched knowledge through
              <br />
              vector space similarity and LLM disambiguation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/app">
                <Button className="rounded-full px-8 py-6 bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                  Start Processing <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="rounded-full px-8 py-6 border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                onClick={scrollToFeatures}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Scroll to discover</p>
          <ChevronDown className="h-6 w-6 text-purple-500" />
        </div>
      </div>

      {/* Features section */}
      <div ref={featuresRef} id="features" className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Key Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Enhance your ITSM data with advanced text processing capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border border-purple-100 dark:border-purple-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <BrainCircuit className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-700 dark:text-purple-300">Semantic Enrichment</h3>
                <p className="text-gray-600 dark:text-gray-400">Enhance text data with semantic context to improve knowledge graph accuracy</p>
              </CardContent>
            </Card>
            
            <Card className="border border-purple-100 dark:border-purple-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Layers className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-700 dark:text-purple-300">Entity Extraction</h3>
                <p className="text-gray-600 dark:text-gray-400">Identify and extract key entities from unstructured text in ITSM tickets</p>
              </CardContent>
            </Card>
            
            <Card className="border border-purple-100 dark:border-purple-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Database className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-700 dark:text-purple-300">Topic Clustering</h3>
                <p className="text-gray-600 dark:text-gray-400">Group related incidents and knowledge articles for better categorization</p>
              </CardContent>
            </Card>
            
            <Card className="border border-purple-100 dark:border-purple-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-700 dark:text-purple-300">Sentiment Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400">Detect sentiment in customer feedback and incident descriptions</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16 text-center flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button className="rounded-full px-8 py-4 bg-primary hover:bg-primary/90 text-white">
                Build Knowledge Base <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/knowledge-bases">
              <Button variant="outline" className="rounded-full px-8 py-4 gap-1.5">
                <Book className="h-4 w-4" />
                <span>Browse Knowledge Bases</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Workflow section */}
      <div id="workflow" className="py-20 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A simple workflow to transform your ITSM text data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 absolute top-10 left-1/2 right-0 hidden md:block"></div>
              <div className="bg-white dark:bg-gray-900 border border-purple-100 dark:border-purple-900/50 rounded-xl p-6 relative">
                <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold absolute -top-10 left-1/2 transform -translate-x-1/2">1</div>
                <div className="mt-12 text-center">
                  <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Upload Data</h3>
                  <p className="text-gray-600 dark:text-gray-400">Import your ITSM datasets or select from sample incident tickets and knowledge articles</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 absolute top-10 left-0 right-0 hidden md:block"></div>
              <div className="bg-white dark:bg-gray-900 border border-purple-100 dark:border-purple-900/50 rounded-xl p-6 relative">
                <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold absolute -top-10 left-1/2 transform -translate-x-1/2">2</div>
                <div className="mt-12 text-center">
                  <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Apply Enhancements</h3>
                  <p className="text-gray-600 dark:text-gray-400">Select from multiple text processing techniques to enrich your data</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 absolute top-10 left-0 right-1/2 hidden md:block"></div>
              <div className="bg-white dark:bg-gray-900 border border-purple-100 dark:border-purple-900/50 rounded-xl p-6 relative">
                <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold absolute -top-10 left-1/2 transform -translate-x-1/2">3</div>
                <div className="mt-12 text-center">
                  <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Export & Analyze</h3>
                  <p className="text-gray-600 dark:text-gray-400">Visualize the enhanced data and export it for use in knowledge systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your ITSM data?</h2>
          <p className="text-xl mb-8 opacity-90">Start pre-processing your text data for improved knowledge retrieval today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button className="rounded-full px-8 py-4 bg-white text-primary hover:bg-gray-100 border-none">
                Create New KB <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/knowledge-bases">
              <Button className="rounded-full px-8 py-4 bg-white/20 hover:bg-white/30 text-white border-white/30">
                <MessageSquare className="mr-1 h-4 w-4" />
                Chat with KB
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-2">
              <Database className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2023 TextPrep. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Terms</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Privacy</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
