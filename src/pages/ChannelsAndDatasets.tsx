import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  Clock,
  Database,
  Download,
  ExternalLink,
  FileText,
  Filter,
  HelpCircle,
  Info,
  MessagesSquare,
  Plus,
  Search,
  Share2,
  Trash2,
  Upload
} from "lucide-react";

import { itsm_datasets, channels, sampleDataRecords } from "@/utils/sampleData";

// Helper function to get icon component based on icon name
const getIconByName = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    HelpCircle: <HelpCircle className="h-4 w-4" />,
    MessagesSquare: <MessagesSquare className="h-4 w-4" />,
    FileText: <FileText className="h-4 w-4" />,
    Share2: <Share2 className="h-4 w-4" />
  };
  return icons[iconName] || <Database className="h-4 w-4" />;
};

// Format date from ISO string
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const DatasetDetailView = ({ dataset }: { dataset: any }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const dataRecords = sampleDataRecords[dataset.id as keyof typeof sampleDataRecords] || [];
  
  if (!dataset) return null;
  
  const getChannel = () => {
    return channels.find(channel => channel.id === dataset.channelId);
  };
  
  const channel = getChannel();
  
  // Get column headers from the first record
  const columnHeaders = dataRecords && dataRecords.length > 0 
    ? Object.keys(dataRecords[0]) 
    : dataset.columns.map((col: any) => col.name);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-8 h-8 rounded flex items-center justify-center",
              channel?.color || "bg-gray-100"
            )}>
              {channel && getIconByName(channel.icon)}
            </div>
            <div>
              <CardTitle>{dataset.name}</CardTitle>
              <CardDescription className="text-sm mt-1">{dataset.description}</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Info className="h-4 w-4" />
                  <span>Info</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dataset Information</DialogTitle>
                  <DialogDescription>Details about this dataset</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Name:</div>
                    <div>{dataset.name}</div>
                    
                    <div className="font-medium">Source:</div>
                    <div>{dataset.source}</div>
                    
                    <div className="font-medium">Format:</div>
                    <div>{dataset.format}</div>
                    
                    <div className="font-medium">Record Count:</div>
                    <div>{dataset.recordCount.toLocaleString()}</div>
                    
                    <div className="font-medium">Last Updated:</div>
                    <div>{formatDate(dataset.lastUpdated)}</div>
                    
                    <div className="font-medium">Channel:</div>
                    <div>
                      <Badge className={channel?.color}>
                        {channel?.name || 'Unknown'}
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="font-medium mb-2">Available Columns:</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {dataset.columns.map((column: any, index: number) => (
                        <div key={index} className="flex items-center gap-1.5">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            column.selected ? "bg-primary" : "bg-gray-300"
                          )} />
                          <span>
                            {column.name}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({column.dataType})
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <CardContent className="pb-0">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="preview" className="flex items-center gap-1.5">
              <Database className="h-4 w-4" />
              <span>Data Preview</span>
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" />
              <span>Usage & Lineage</span>
            </TabsTrigger>
          </TabsList>
        </CardContent>
        
        <TabsContent value="preview" className="flex-1 flex flex-col px-6 m-0">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {Math.min(dataRecords?.length || 0, 10)} of {dataset.recordCount.toLocaleString()} records
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 border rounded-md">
            <div className="min-w-max">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columnHeaders.map((header, index) => (
                      <TableHead key={index} className="whitespace-nowrap">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataRecords && dataRecords.length > 0 ? (
                    dataRecords.map((record: any, rowIndex: number) => (
                      <TableRow key={rowIndex}>
                        {columnHeaders.map((header, cellIndex) => (
                          <TableCell key={cellIndex} className="max-w-md truncate">
                            {typeof record[header] === 'boolean' 
                              ? record[header] ? 'Yes' : 'No'
                              : String(record[header])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columnHeaders.length} className="h-24 text-center">
                        No preview data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="usage" className="px-6 py-4 m-0">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-3">Knowledge Base Usage</h3>
              <div className="space-y-2">
                {dataset.id === 'incidents' || dataset.id === 'knowledge_articles' || 
                 dataset.id === 'problem_records' || dataset.id === 'service_requests' ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/50">
                      <Database className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">IT Support Knowledge Base</div>
                        <div className="text-sm text-muted-foreground">Created on {formatDate('2023-11-20')}</div>
                      </div>
                      <Button size="sm" variant="ghost" className="ml-auto gap-1">
                        <ExternalLink className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                    </div>
                    
                    {dataset.id === 'service_requests' && (
                      <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/50">
                        <Database className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Service Request Analysis</div>
                          <div className="text-sm text-muted-foreground">Created on {formatDate('2023-11-22')}</div>
                        </div>
                        <Button size="sm" variant="ghost" className="ml-auto gap-1">
                          <ExternalLink className="h-4 w-4" />
                          <span>View</span>
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <Database className="h-10 w-10 mb-4 opacity-30" />
                    <p className="text-sm">This dataset has not been used in any knowledge bases yet</p>
                    <Button size="sm" variant="outline" className="mt-4 gap-1.5">
                      <Plus className="h-4 w-4" />
                      Create Knowledge Base
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium text-lg mb-3">Data Lineage</h3>
              <div className="border rounded-md p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Imported from {dataset.source} on {formatDate(dataset.lastUpdated)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Text preprocessing applied (tokenization, stopword removal)</span>
                </div>
                
                {(dataset.id === 'incidents' || dataset.id === 'problem_records') && (
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Entity extraction performed on {formatDate('2023-11-22')}</span>
                  </div>
                )}
                
                {dataset.id === 'social_media_posts' && (
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Sentiment analysis performed on {formatDate('2023-11-24')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="pt-3 pb-4 flex justify-between border-t">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            <span>{dataset.format}</span>
          </div>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <div className="flex items-center">
            <Database className="h-4 w-4 mr-1" />
            <span>{dataset.recordCount.toLocaleString()} records</span>
          </div>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Updated {formatDate(dataset.lastUpdated)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Create KB</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const ChannelsAndDatasets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  
  // Filter datasets based on search term and selected channel
  const filteredDatasets = itsm_datasets.filter(dataset => {
    const matchesSearch = searchTerm === '' || 
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesChannel = selectedChannel === null || dataset.channelId === selectedChannel;
    
    return matchesSearch && matchesChannel;
  });
  
  // Group datasets by channel
  const groupedDatasets = channels.map(channel => ({
    ...channel,
    datasets: filteredDatasets.filter(dataset => dataset.channelId === channel.id)
  }));
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/50">
      <main className="flex-1 container px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Channels & Datasets</h1>
              <p className="text-muted-foreground mt-1">
                Browse and manage data sources for knowledge base creation
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                <span>Import Data</span>
              </Button>
              <Button
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Dataset</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 xl:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Sources</CardTitle>
                  <CardDescription>
                    Browse datasets by channel
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search datasets..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <Button
                      variant={selectedChannel === null ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start font-normal"
                      onClick={() => setSelectedChannel(null)}
                    >
                      <Database className="h-4 w-4 mr-2" />
                      All Datasets ({itsm_datasets.length})
                    </Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium mb-2">Channels</h3>
                    <Accordion type="single" collapsible className="space-y-1 w-full">
                      {groupedDatasets.map((channel) => (
                        <AccordionItem key={channel.id} value={channel.id} className="border-none">
                          <AccordionTrigger className="py-1 px-2 text-sm hover:bg-muted/70 rounded-md hover:no-underline">
                            <div className="flex items-center">
                              <div className={cn(
                                "w-6 h-6 rounded flex items-center justify-center mr-2",
                                channel.color
                              )}>
                                {getIconByName(channel.icon)}
                              </div>
                              <span>{channel.name}</span>
                              <Badge variant="outline" className="ml-2 py-0 px-1.5 h-5">
                                {channel.datasets.length}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-0 px-2">
                            <div className="space-y-1 ml-8">
                              {channel.datasets.map((dataset) => (
                                <Button
                                  key={dataset.id}
                                  variant={selectedDataset?.id === dataset.id ? "secondary" : "ghost"}
                                  size="sm"
                                  className="w-full justify-start font-normal text-sm"
                                  onClick={() => {
                                    setSelectedDataset(dataset);
                                    setSelectedChannel(channel.id);
                                  }}
                                >
                                  <FileText className="h-3.5 w-3.5 mr-2 opacity-70" />
                                  {dataset.name}
                                </Button>
                              ))}
                              {channel.datasets.length === 0 && (
                                <div className="text-sm text-muted-foreground py-1 px-2">
                                  No datasets found
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Information</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-4">
                  <p>
                    Datasets are organized by channels representing different data sources. 
                    Each dataset can be used to create knowledge bases for enhanced search and analysis.
                  </p>
                  <p>
                    Select a dataset to view its details and preview the data. You can also see 
                    which knowledge bases use a particular dataset.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-8 xl:col-span-9">
              {selectedDataset ? (
                <DatasetDetailView dataset={selectedDataset} />
              ) : (
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <Database className="h-16 w-16 mb-6 text-muted-foreground/30" />
                    <h2 className="text-xl font-medium mb-2">Select a Dataset</h2>
                    <p className="text-muted-foreground max-w-md mb-6">
                      Choose a dataset from the left panel to view its details and preview the data
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full mt-4">
                      {channels.map((channel) => (
                        <Button
                          key={channel.id}
                          variant="outline"
                          className="h-auto py-4 px-4 flex flex-col items-center justify-center gap-3"
                          onClick={() => setSelectedChannel(channel.id)}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            channel.color
                          )}>
                            {getIconByName(channel.icon)}
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{channel.name}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {itsm_datasets.filter(d => d.channelId === channel.id).length} datasets
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChannelsAndDatasets;