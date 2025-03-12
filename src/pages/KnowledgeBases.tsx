import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Book, Database, Filter, MessageSquare, MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { knowledgeBases } from "@/utils/sampleData";

interface KnowledgeBaseProps {
  id: string;
  name: string;
  description: string;
  sourceDataset: string;
  createdAt: string;
  documentCount: number;
  status: string;
  lastQueried: string;
}

const KnowledgeBases = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredKnowledgeBases = knowledgeBases.filter(kb => 
    kb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kb.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kb.sourceDataset.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenChat = (knowledgeBaseId: string) => {
    navigate(`/chat/${knowledgeBaseId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/50">
      <main className="flex-1 container px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Knowledge Bases</h1>
              <p className="text-muted-foreground mt-1">
                Browse, search and query your existing knowledge bases
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => navigate('/app')} 
                variant="outline" 
                className="gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create New</span>
              </Button>
              <Button 
                variant="default" 
                className="gap-2"
              >
                <Database className="h-4 w-4" />
                <span>Import KB</span>
              </Button>
            </div>
          </div>

          <Card className="bg-card/70 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>Knowledge Base Repository</CardTitle>
              <CardDescription>
                Access and manage your knowledge bases for querying and analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search knowledge bases..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-10 gap-1.5">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Source Dataset</TableHead>
                        <TableHead className="hidden md:table-cell">Created</TableHead>
                        <TableHead className="hidden lg:table-cell">Documents</TableHead>
                        <TableHead className="hidden lg:table-cell">Last Queried</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredKnowledgeBases.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-32 text-center">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Book className="h-10 w-10 mb-2" />
                              <p>No knowledge bases found</p>
                              <p className="text-sm">Create a new knowledge base or adjust your search.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredKnowledgeBases.map((kb) => (
                          <TableRow key={kb.id} className="group">
                            <TableCell>
                              <div className="font-medium">{kb.name}</div>
                              <div className="text-sm text-muted-foreground hidden sm:block md:hidden">
                                {kb.sourceDataset}
                              </div>
                              <div className="text-xs text-muted-foreground sm:hidden">
                                {formatDate(kb.createdAt)} • {kb.status}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{kb.sourceDataset}</TableCell>
                            <TableCell className="hidden md:table-cell">{formatDate(kb.createdAt)}</TableCell>
                            <TableCell className="hidden lg:table-cell">{kb.documentCount.toLocaleString()}</TableCell>
                            <TableCell className="hidden lg:table-cell">{formatDate(kb.lastQueried)}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge variant={kb.status === 'active' ? 'default' : 'outline'}>
                                {kb.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleOpenChat(kb.id)}
                                  title="Chat with this knowledge base"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Edit Metadata</DropdownMenuItem>
                                    <DropdownMenuItem>Update Index</DropdownMenuItem>
                                    <DropdownMenuItem>Export</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default KnowledgeBases;