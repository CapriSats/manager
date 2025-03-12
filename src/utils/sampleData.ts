// Sample datasets for the application
export const itsm_datasets = [
  {
    id: "incidents",
    name: "Incident Tickets",
    description: "IT service desk incident records with descriptions and resolutions",
    recordCount: 5482,
    channelId: "itsm",
    source: "ServiceNow",
    lastUpdated: "2023-11-10",
    format: "CSV",
    columns: [
      { name: "incident_id", dataType: "string", selected: false },
      { name: "created_at", dataType: "datetime", selected: false },
      { name: "title", dataType: "string", selected: false },
      { name: "description", dataType: "text", selected: true },
      { name: "priority", dataType: "string", selected: false },
      { name: "status", dataType: "string", selected: false },
      { name: "resolution_notes", dataType: "text", selected: true },
      { name: "assigned_to", dataType: "string", selected: false },
      { name: "category", dataType: "string", selected: false },
      { name: "subcategory", dataType: "string", selected: false }
    ]
  },
  {
    id: "service_requests",
    name: "Service Requests",
    description: "User service requests with detailed requirements and fulfillment notes",
    recordCount: 3241,
    channelId: "itsm",
    source: "ServiceNow",
    lastUpdated: "2023-11-15",
    format: "CSV",
    columns: [
      { name: "request_id", dataType: "string", selected: false },
      { name: "submitted_at", dataType: "datetime", selected: false },
      { name: "requester", dataType: "string", selected: false },
      { name: "request_title", dataType: "string", selected: false },
      { name: "request_description", dataType: "text", selected: true },
      { name: "request_type", dataType: "string", selected: false },
      { name: "fulfillment_notes", dataType: "text", selected: true },
      { name: "request_status", dataType: "string", selected: false },
      { name: "approval_status", dataType: "string", selected: false },
      { name: "service_catalog_item", dataType: "string", selected: false }
    ]
  },
  {
    id: "change_requests",
    name: "Change Management",
    description: "IT change requests with justifications, plans, and impact assessments",
    recordCount: 1872,
    channelId: "itsm",
    source: "ServiceNow",
    lastUpdated: "2023-11-08",
    format: "CSV",
    columns: [
      { name: "change_id", dataType: "string", selected: false },
      { name: "proposed_at", dataType: "datetime", selected: false },
      { name: "title", dataType: "string", selected: false },
      { name: "justification", dataType: "text", selected: true },
      { name: "change_description", dataType: "text", selected: true },
      { name: "impact_assessment", dataType: "text", selected: true },
      { name: "risk_analysis", dataType: "text", selected: false },
      { name: "backout_plan", dataType: "text", selected: false },
      { name: "implementation_plan", dataType: "text", selected: false },
      { name: "change_type", dataType: "string", selected: false },
      { name: "status", dataType: "string", selected: false }
    ]
  },
  {
    id: "problem_records",
    name: "Problem Records",
    description: "IT problem management records with root cause analysis",
    recordCount: 943,
    channelId: "itsm",
    source: "ServiceNow",
    lastUpdated: "2023-11-05",
    format: "CSV",
    columns: [
      { name: "problem_id", dataType: "string", selected: false },
      { name: "identified_at", dataType: "datetime", selected: false },
      { name: "title", dataType: "string", selected: false },
      { name: "problem_description", dataType: "text", selected: true },
      { name: "impact", dataType: "string", selected: false },
      { name: "urgency", dataType: "string", selected: false },
      { name: "root_cause_analysis", dataType: "text", selected: true },
      { name: "workaround", dataType: "text", selected: true },
      { name: "permanent_solution", dataType: "text", selected: true },
      { name: "related_incidents", dataType: "string", selected: false },
      { name: "status", dataType: "string", selected: false }
    ]
  },
  {
    id: "knowledge_articles",
    name: "Knowledge Articles",
    description: "IT knowledge base articles with solutions and troubleshooting steps",
    recordCount: 2654,
    channelId: "itsm",
    source: "ServiceNow",
    lastUpdated: "2023-11-18",
    format: "CSV",
    columns: [
      { name: "article_id", dataType: "string", selected: false },
      { name: "created_at", dataType: "datetime", selected: false },
      { name: "title", dataType: "string", selected: false },
      { name: "content", dataType: "text", selected: true },
      { name: "keywords", dataType: "string", selected: true },
      { name: "category", dataType: "string", selected: false },
      { name: "author", dataType: "string", selected: false },
      { name: "views", dataType: "number", selected: false },
      { name: "rating", dataType: "number", selected: false },
      { name: "related_services", dataType: "string", selected: false }
    ]
  },
  {
    id: "customer_feedback",
    name: "Customer Feedback",
    description: "Customer feedback and survey responses about IT services",
    recordCount: 3245,
    channelId: "customer",
    source: "SurveyMonkey",
    lastUpdated: "2023-11-12",
    format: "CSV",
    columns: [
      { name: "feedback_id", dataType: "string", selected: false },
      { name: "submitted_at", dataType: "datetime", selected: false },
      { name: "customer_id", dataType: "string", selected: false },
      { name: "service_type", dataType: "string", selected: false },
      { name: "satisfaction_score", dataType: "number", selected: false },
      { name: "comments", dataType: "text", selected: true },
      { name: "improvement_suggestions", dataType: "text", selected: true },
      { name: "would_recommend", dataType: "boolean", selected: false },
      { name: "response_channel", dataType: "string", selected: false }
    ]
  },
  {
    id: "support_emails",
    name: "Support Emails",
    description: "Customer support emails and communications",
    recordCount: 8975,
    channelId: "customer",
    source: "Email Server",
    lastUpdated: "2023-11-20",
    format: "CSV",
    columns: [
      { name: "email_id", dataType: "string", selected: false },
      { name: "received_at", dataType: "datetime", selected: false },
      { name: "sender", dataType: "string", selected: false },
      { name: "subject", dataType: "string", selected: false },
      { name: "body", dataType: "text", selected: true },
      { name: "attachments", dataType: "string", selected: false },
      { name: "category", dataType: "string", selected: false },
      { name: "response_time_minutes", dataType: "number", selected: false },
      { name: "status", dataType: "string", selected: false }
    ]
  },
  {
    id: "product_documentation",
    name: "Product Documentation",
    description: "Technical documentation for products and services",
    recordCount: 567,
    channelId: "docs",
    source: "Confluence",
    lastUpdated: "2023-11-14",
    format: "Markdown",
    columns: [
      { name: "doc_id", dataType: "string", selected: false },
      { name: "title", dataType: "string", selected: false },
      { name: "content", dataType: "text", selected: true },
      { name: "product", dataType: "string", selected: false },
      { name: "version", dataType: "string", selected: false },
      { name: "last_updated", dataType: "datetime", selected: false },
      { name: "author", dataType: "string", selected: false },
      { name: "tags", dataType: "string", selected: true },
      { name: "category", dataType: "string", selected: false }
    ]
  },
  {
    id: "training_materials",
    name: "Training Materials",
    description: "Training documentation and instructional materials",
    recordCount: 289,
    channelId: "docs",
    source: "LMS",
    lastUpdated: "2023-10-30",
    format: "PDF",
    columns: [
      { name: "training_id", dataType: "string", selected: false },
      { name: "title", dataType: "string", selected: false },
      { name: "description", dataType: "text", selected: false },
      { name: "content", dataType: "text", selected: true },
      { name: "skill_level", dataType: "string", selected: false },
      { name: "duration_minutes", dataType: "number", selected: false },
      { name: "created_at", dataType: "datetime", selected: false },
      { name: "category", dataType: "string", selected: false },
      { name: "target_audience", dataType: "string", selected: false }
    ]
  },
  {
    id: "api_documentation",
    name: "API Documentation",
    description: "Technical API documentation and usage examples",
    recordCount: 421,
    channelId: "docs",
    source: "Swagger",
    lastUpdated: "2023-11-07",
    format: "JSON",
    columns: [
      { name: "api_id", dataType: "string", selected: false },
      { name: "endpoint", dataType: "string", selected: false },
      { name: "method", dataType: "string", selected: false },
      { name: "description", dataType: "text", selected: true },
      { name: "parameters", dataType: "text", selected: false },
      { name: "request_example", dataType: "text", selected: true },
      { name: "response_example", dataType: "text", selected: true },
      { name: "authentication", dataType: "string", selected: false },
      { name: "version", dataType: "string", selected: false }
    ]
  },
  {
    id: "social_media_posts",
    name: "Social Media Posts",
    description: "Posts and comments from company social media accounts",
    recordCount: 12568,
    channelId: "social",
    source: "Sprinklr",
    lastUpdated: "2023-11-19",
    format: "JSON",
    columns: [
      { name: "post_id", dataType: "string", selected: false },
      { name: "platform", dataType: "string", selected: false },
      { name: "posted_at", dataType: "datetime", selected: false },
      { name: "content", dataType: "text", selected: true },
      { name: "author", dataType: "string", selected: false },
      { name: "likes", dataType: "number", selected: false },
      { name: "shares", dataType: "number", selected: false },
      { name: "comments_count", dataType: "number", selected: false },
      { name: "sentiment", dataType: "string", selected: false },
      { name: "hashtags", dataType: "string", selected: true }
    ]
  },
  {
    id: "forum_discussions",
    name: "Forum Discussions",
    description: "Customer and community forum discussions about products",
    recordCount: 5321,
    channelId: "social",
    source: "Discourse",
    lastUpdated: "2023-11-16",
    format: "JSON",
    columns: [
      { name: "thread_id", dataType: "string", selected: false },
      { name: "title", dataType: "string", selected: false },
      { name: "created_at", dataType: "datetime", selected: false },
      { name: "content", dataType: "text", selected: true },
      { name: "author", dataType: "string", selected: false },
      { name: "category", dataType: "string", selected: false },
      { name: "replies_count", dataType: "number", selected: false },
      { name: "views", dataType: "number", selected: false },
      { name: "tags", dataType: "string", selected: true },
      { name: "is_solved", dataType: "boolean", selected: false }
    ]
  }
];

// Channel definitions for grouping datasets
export const channels = [
  {
    id: "itsm",
    name: "IT Service Management",
    description: "Service desk and IT support data sources",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    icon: "HelpCircle"
  },
  {
    id: "customer",
    name: "Customer Feedback",
    description: "Customer communications and feedback channels",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: "MessagesSquare"
  },
  {
    id: "docs",
    name: "Documentation",
    description: "Product and technical documentation sources",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    icon: "FileText"
  },
  {
    id: "social",
    name: "Social & Community",
    description: "Social media and community engagement platforms",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    icon: "Share2"
  }
];

// Sample knowledge bases that have been created
export const knowledgeBases = [
  {
    id: "kb-1",
    name: "IT Support Knowledge Base",
    description: "Knowledge base built from incident tickets to assist support agents",
    sourceDataset: "Incident Tickets",
    createdAt: "2023-11-20",
    documentCount: 2350,
    status: "active",
    lastQueried: "2023-11-28"
  },
  {
    id: "kb-2",
    name: "Service Request Analysis",
    description: "Analysis of service requests for workflow optimization",
    sourceDataset: "Service Requests",
    createdAt: "2023-11-22",
    documentCount: 3120,
    status: "active",
    lastQueried: "2023-11-27"
  },
  {
    id: "kb-3",
    name: "Technical Documentation Repository",
    description: "Technical documentation and guides for internal reference",
    sourceDataset: "Knowledge Articles",
    createdAt: "2023-11-25",
    documentCount: 2542,
    status: "active",
    lastQueried: "2023-11-26"
  },
  {
    id: "kb-4",
    name: "Problem Management Center",
    description: "Centralized knowledge base for problem management and resolution",
    sourceDataset: "Problem Records",
    createdAt: "2023-11-15",
    documentCount: 915,
    status: "active",
    lastQueried: "2023-11-24"
  }
];

// Sample chat messages for the chat interface
export const sampleChatMessages = [
  {
    id: 1,
    role: "user",
    content: "What are the most common issues users report with Outlook?",
    timestamp: "2023-11-28T09:15:23Z"
  },
  {
    id: 2,
    role: "assistant",
    content: "Based on the IT Support Knowledge Base, the most common Outlook issues reported are:\n\n1. Connection errors after password resets (22%)\n2. Application crashes at startup (18%)\n3. Slow performance when handling large mailboxes (15%)\n4. Problems with calendar sync across devices (12%)\n5. Search functionality not returning expected results (10%)\n\nThese issues account for approximately 77% of all Outlook-related support tickets in the last 3 months. The most effective resolution for connection issues involves resetting credentials in Active Directory and clearing cached credentials on the local machine.",
    timestamp: "2023-11-28T09:15:45Z",
    sourceDocuments: [
      { id: "doc-134", title: "Incident #4532: Outlook Connection Error", relevance: 0.92 },
      { id: "doc-267", title: "Common Email Issues - Q3 2023", relevance: 0.89 },
      { id: "doc-398", title: "Outlook Troubleshooting Guide", relevance: 0.85 }
    ]
  },
  {
    id: 3,
    role: "user",
    content: "How many VPN connection failures were reported in the last week?",
    timestamp: "2023-11-28T09:16:30Z"
  },
  {
    id: 4,
    role: "assistant",
    content: "In the last week, 37 VPN connection failures were reported to IT support. This represents a 12% decrease from the previous week, suggesting the recent VPN client update has improved connectivity. Most of these reports mention:\n\n- Timeout errors when connecting to remote servers (48%)\n- Authentication failures with correct credentials (32%)\n- VPN disconnections during active sessions (15%)\n- Configuration issues after system updates (5%)\n\nThe most successful resolution involves updating the VPN client to the latest version and reconfiguring connection settings.",
    timestamp: "2023-11-28T09:16:50Z",
    sourceDocuments: [
      { id: "doc-512", title: "Weekly Support Analytics - Nov 21-28", relevance: 0.95 },
      { id: "doc-134", title: "VPN Troubleshooting Guide", relevance: 0.78 },
      { id: "doc-601", title: "Remote Access Update Notes", relevance: 0.72 }
    ]
  }
];

// Sample data records for preview
export const sampleDataRecords = {
  // ITSM - Incident Tickets
  incidents: [
    {
      incident_id: "INC0012345",
      created_at: "2023-10-15T09:23:15Z",
      title: "Outlook Connection Issue",
      description: "User unable to access email after password reset. Multiple login attempts failed with 'invalid credentials' message.",
      priority: "Medium",
      status: "Resolved",
      resolution_notes: "Reset user's account in Active Directory and cleared cached credentials on local machine. Email access restored.",
      assigned_to: "John Smith",
      category: "Email",
      subcategory: "Outlook"
    },
    {
      incident_id: "INC0012346",
      created_at: "2023-10-15T10:45:22Z",
      title: "VPN Connection Failure",
      description: "VPN connection fails with timeout error. User can connect to other network resources but not remote servers.",
      priority: "High",
      status: "Resolved",
      resolution_notes: "Updated VPN client to latest version and reconfigured connection settings. Remote access now working properly.",
      assigned_to: "Jane Doe",
      category: "Network",
      subcategory: "VPN"
    },
    {
      incident_id: "INC0012347",
      created_at: "2023-10-15T13:12:08Z",
      title: "Laptop Performance Issue",
      description: "User reports slow performance on laptop after recent Windows update. Multiple applications affected.",
      priority: "Low",
      status: "Resolved",
      resolution_notes: "Rolled back recent Windows update and ran disk cleanup utility. System performance returned to normal.",
      assigned_to: "Michael Johnson",
      category: "Hardware",
      subcategory: "Laptop"
    }
  ],
  // Customer Feedback
  customer_feedback: [
    {
      feedback_id: "FB3421",
      submitted_at: "2023-11-05T14:23:45Z",
      customer_id: "CUST8765",
      service_type: "Technical Support",
      satisfaction_score: 4,
      comments: "The support agent was very knowledgeable and resolved my issue quickly. Very satisfied with the service.",
      improvement_suggestions: "It would be nice to have weekend support hours for critical issues.",
      would_recommend: true,
      response_channel: "Email"
    },
    {
      feedback_id: "FB3422",
      submitted_at: "2023-11-06T09:12:33Z",
      customer_id: "CUST5432",
      service_type: "Software Installation",
      satisfaction_score: 3,
      comments: "Installation was successful but took longer than expected. The instructions could be clearer.",
      improvement_suggestions: "Please provide more detailed installation guides with screenshots.",
      would_recommend: true,
      response_channel: "Web"
    },
    {
      feedback_id: "FB3423",
      submitted_at: "2023-11-06T16:45:18Z",
      customer_id: "CUST9876",
      service_type: "Account Management",
      satisfaction_score: 2,
      comments: "Had difficulty updating my billing information. The system kept giving errors.",
      improvement_suggestions: "The billing portal needs to be more user-friendly with better error messages.",
      would_recommend: false,
      response_channel: "Web"
    }
  ],
  // Documentation - API Documentation
  api_documentation: [
    {
      api_id: "API-001",
      endpoint: "/api/v1/users",
      method: "GET",
      description: "Retrieves a list of users with optional filtering parameters.",
      parameters: "page, limit, sort, filter",
      request_example: "GET /api/v1/users?limit=10&sort=name",
      response_example: "{\n  \"users\": [\n    {\n      \"id\": 1,\n      \"name\": \"John Doe\",\n      \"email\": \"john@example.com\"\n    }\n  ],\n  \"total\": 1,\n  \"page\": 1,\n  \"pages\": 1\n}",
      authentication: "Bearer Token",
      version: "1.0"
    },
    {
      api_id: "API-002",
      endpoint: "/api/v1/users",
      method: "POST",
      description: "Creates a new user account with the provided information.",
      parameters: "None",
      request_example: "POST /api/v1/users\n{\n  \"name\": \"Jane Smith\",\n  \"email\": \"jane@example.com\",\n  \"password\": \"securepassword\"\n}",
      response_example: "{\n  \"id\": 2,\n  \"name\": \"Jane Smith\",\n  \"email\": \"jane@example.com\",\n  \"created_at\": \"2023-11-07T10:15:32Z\"\n}",
      authentication: "API Key",
      version: "1.0"
    },
    {
      api_id: "API-003",
      endpoint: "/api/v1/users/{id}",
      method: "PUT",
      description: "Updates an existing user's information.",
      parameters: "id (path parameter)",
      request_example: "PUT /api/v1/users/2\n{\n  \"name\": \"Jane Smith-Johnson\",\n  \"email\": \"jane.new@example.com\"\n}",
      response_example: "{\n  \"id\": 2,\n  \"name\": \"Jane Smith-Johnson\",\n  \"email\": \"jane.new@example.com\",\n  \"updated_at\": \"2023-11-07T14:22:18Z\"\n}",
      authentication: "Bearer Token",
      version: "1.0"
    }
  ],
  // Social & Community - Social Media Posts
  social_media_posts: [
    {
      post_id: "SM-12345",
      platform: "Twitter",
      posted_at: "2023-11-15T13:45:22Z",
      content: "Excited to announce our new cloud security features! Check out our blog for details. #CloudSecurity #ProductUpdate",
      author: "CompanyOfficial",
      likes: 78,
      shares: 34,
      comments_count: 12,
      sentiment: "positive",
      hashtags: "CloudSecurity,ProductUpdate"
    },
    {
      post_id: "SM-12346",
      platform: "LinkedIn",
      posted_at: "2023-11-16T09:30:15Z",
      content: "Our team will be at the Tech Conference next week. Stop by booth #42 to see our latest innovations and chat with our experts! #TechConf2023 #Networking",
      author: "CompanyOfficial",
      likes: 132,
      shares: 45,
      comments_count: 23,
      sentiment: "positive",
      hashtags: "TechConf2023,Networking"
    },
    {
      post_id: "SM-12347",
      platform: "Facebook",
      posted_at: "2023-11-17T15:20:08Z",
      content: "We're aware of the sign-in issues some users are experiencing. Our team is working on a fix and we'll update you shortly. We apologize for any inconvenience.",
      author: "CompanyOfficial",
      likes: 45,
      shares: 87,
      comments_count: 56,
      sentiment: "neutral",
      hashtags: "ServiceUpdate,TechnicalIssue"
    }
  ]
};

// Sample text data for preview
export const getSampleTextData = (datasetId: string, columnName: string) => {
  const samples = {
    incidents: {
      description: [
        "User unable to access email after password reset. Multiple login attempts failed with 'invalid credentials' message.",
        "Outlook crashes immediately after startup. User reports seeing brief error message before application closes.",
        "VPN connection fails with timeout error. User can connect to other network resources but not remote servers.",
        "SharePoint document library not displaying documents. Access permissions appear correct but content does not load.",
        "User reports slow performance on laptop after recent Windows update. Multiple applications affected."
      ],
      resolution_notes: [
        "Reset user's account in Active Directory and cleared cached credentials on local machine. Email access restored.",
        "Outlook profile was corrupted. Created new profile and migrated settings. Application now starts normally.",
        "Updated VPN client to latest version and reconfigured connection settings. Remote access now working properly.",
        "Identified permission issue at site collection level. Fixed inheritance settings and documents now display correctly.",
        "Rolled back recent Windows update and ran disk cleanup utility. System performance returned to normal."
      ]
    },
    service_requests: {
      request_description: [
        "New hire starting in Marketing department requires laptop setup with Adobe Creative Suite and access to marketing resources.",
        "Department requesting installation of specialized accounting software on 5 workstations before end of fiscal year.",
        "User requesting upgrade of RAM in desktop computer due to performance issues with data analysis applications.",
        "Team needs new shared mailbox created for customer service inquiries with appropriate access for 8 team members.",
        "Request for two additional monitors for remote worker to support data entry tasks requiring multiple screens."
      ],
      fulfillment_notes: [
        "Provisioned laptop with required software, created user accounts with appropriate permissions, and scheduled orientation.",
        "Installed accounting software on designated workstations. Validated license activation and tested functionality with users.",
        "Upgraded RAM from 8GB to 16GB. Tested system performance with user's typical workload and confirmed improvement.",
        "Created shared mailbox with required permissions. Configured forwarding rules and verified access for all team members.",
        "Shipped monitors with necessary cables and adapters. Provided remote assistance for setup and configuration."
      ]
    },
    change_requests: {
      change_description: [
        "Server OS upgrade from Windows Server 2016 to Windows Server 2022 on database servers DB-01 through DB-04.",
        "Implementation of new firewall rules to restrict inbound traffic on public-facing web servers.",
        "Database schema modification to support new customer relationship management features in v3.5 release.",
        "Network infrastructure upgrade to replace end-of-life switches in Building C with Cisco Catalyst 9300 series.",
        "Storage capacity expansion for primary file servers by adding 20TB to existing SAN configuration."
      ],
      justification: [
        "Current OS approaching end of support. Upgrade provides security enhancements and better performance for SQL workloads.",
        "Security audit identified vulnerabilities in current configuration. New rules will mitigate potential attack vectors.",
        "Schema changes required to support upcoming software release with enhanced customer tracking capabilities.",
        "Existing switches have reached end-of-life status and no longer receive security updates. Replacement necessary for network reliability.",
        "Current storage utilization at 85% capacity with projected growth exceeding available space within 60 days."
      ],
      impact_assessment: [
        "Medium impact. Database services will be unavailable during maintenance window. Estimated downtime 4 hours per server.",
        "Low impact. Implementation will occur during non-business hours with less than 5 minutes of connection interruption.",
        "Medium impact. Database modifications require application downtime of approximately 2 hours during implementation.",
        "Medium impact. Network services in Building C will experience intermittent disruption during switch replacement.",
        "Low impact. Storage expansion can be performed without service interruption using hot-add capability."
      ]
    },
    problem_records: {
      problem_description: [
        "Intermittent network disconnections affecting multiple users in the Finance department during peak business hours.",
        "Application crashes when processing reports containing more than 10,000 data rows across multiple departments.",
        "Authentication failures occurring sporadically across cloud services, primarily affecting remote workers.",
        "Database query performance degradation observed over the past month, impacting multiple business applications.",
        "Print spooler service repeatedly crashes on print server PS-01, causing print job failures for connected departments."
      ],
      root_cause_analysis: [
        "Investigation revealed faulty network switch causing packet loss during high traffic periods. Logs showed intermittent hardware errors.",
        "Memory leak identified in reporting module when processing large datasets. Application doesn't properly release resources after calculation operations.",
        "Identity provider's certificate expired, causing intermittent authentication failures. Automatic renewal process failed due to misconfiguration.",
        "Database index fragmentation reached critical levels due to high transaction volume and inadequate maintenance schedule.",
        "Corrupted print driver for HP LaserJet devices conflicts with Windows updates installed on March 15. Conflict causes memory exception in spooler service."
      ],
      workaround: [
        "Implemented traffic shaping to reduce load on affected switch and rerouted critical traffic through secondary switch temporarily.",
        "Advised users to break large reports into smaller segments of 5,000 rows or less until permanent fix is deployed.",
        "Implemented alternative authentication path through secondary identity provider while certificate issue was addressed.",
        "Created lightweight queries for critical operations and scheduled non-essential processing during off-peak hours.",
        "Disabled problematic print driver and configured affected printers to use universal print driver as temporary solution."
      ]
    },
    knowledge_articles: {
      content: [
        "# Resolving Outlook Connection Errors\n\nIf you experience connection errors in Outlook, follow these troubleshooting steps:\n\n1. **Verify network connectivity** by opening a web browser and accessing a website\n2. **Check Outlook connection status** by holding CTRL while right-clicking the Outlook icon in the system tray\n3. **Reset credentials** in Control Panel > Credential Manager > Windows Credentials\n4. **Test with Outlook Safe Mode** by holding CTRL while launching Outlook\n5. **Repair Office installation** through Control Panel > Programs > Office > Change\n\nIf problems persist, contact IT support with the error message and troubleshooting steps attempted.",
        "# Configuring Multi-Factor Authentication\n\nMulti-factor authentication (MFA) provides an additional layer of security for your accounts. Follow these steps to configure MFA:\n\n1. **Sign in to the company portal** at https://portal.example.com\n2. **Navigate to Security settings** in your profile\n3. **Select 'Set up multi-factor authentication'**\n4. **Choose your preferred verification method**:\n   - Mobile app (recommended)\n   - Text message\n   - Phone call\n5. **Complete verification process** by following the prompts\n\nAfter setup, you'll be prompted for additional verification when signing in from new devices or locations.",
        "# Troubleshooting VPN Connection Issues\n\nIf you're experiencing VPN connection problems, try these solutions:\n\n1. **Check internet connection** by visiting a website in your browser\n2. **Verify credentials** are entered correctly (username and password)\n3. **Restart VPN client** completely (exit from system tray first)\n4. **Check VPN client version** and update if necessary\n5. **Disable other security software** temporarily (firewall, antivirus)\n6. **Try alternative network** (mobile hotspot instead of Wi-Fi)\n7. **Clear VPN client cache** using instructions for your specific client\n\nFor persistent issues, collect error messages and contact IT support.",
        "# Managing Large Email Attachments\n\nWhen sending large files through email, consider these best practices:\n\n1. **Use company file sharing service** for files over 10MB\n   - Upload to https://files.example.com\n   - Set permissions for recipients\n   - Share link via email instead of attachment\n2. **Compress files** using ZIP format for moderate size reductions\n3. **Split large documents** into smaller sections when possible\n4. **Convert to efficient formats** (e.g., Word to PDF)\n5. **Remove unnecessary content** such as unused slides or high-resolution images\n\nRemember: Our email system rejects attachments larger than 25MB.",
        "# Securing Your Workstation When Unattended\n\nProtect sensitive information by securing your workstation when stepping away:\n\n1. **Lock your computer** using Windows+L keyboard shortcut\n2. **Set up automatic locking** after inactivity\n   - Open Settings > System > Power & sleep > Screen\n   - Select appropriate timeout period (recommended: 5-10 minutes)\n3. **Use privacy screen** for open office environments\n4. **Secure physical documents** in drawers or cabinets\n5. **Enable disk encryption** to protect data if device is stolen\n\nRemember: You are responsible for any actions taken under your account, even if you didn't perform them yourself."
      ],
      keywords: [
        "Outlook, email, connection error, troubleshooting, Office 365, Exchange",
        "MFA, 2FA, multi-factor authentication, security, login, verification",
        "VPN, remote access, connection issues, network, troubleshooting, remote work",
        "email attachments, file sharing, file size, large files, compression",
        "security, workstation, physical security, screen lock, unattended computer"
      ]
    },
    customer_feedback: {
      comments: [
        "The support agent was very knowledgeable and resolved my issue quickly. Very satisfied with the service.",
        "Installation was successful but took longer than expected. The instructions could be clearer.",
        "Had difficulty updating my billing information. The system kept giving errors.",
        "Support response time was excellent. Agent stayed on the call until everything was working.",
        "Product works as expected, but the documentation is outdated and contains incorrect information."
      ],
      improvement_suggestions: [
        "It would be nice to have weekend support hours for critical issues.",
        "Please provide more detailed installation guides with screenshots.",
        "The billing portal needs to be more user-friendly with better error messages.",
        "Consider adding a live chat option for quick questions.",
        "Update documentation regularly to match the current version of the software."
      ]
    },
    product_documentation: {
      content: [
        "# User Authentication\n\nThis guide explains how to implement user authentication in your application.\n\n## Basic Authentication\n\nBasic authentication requires a username and password with each request:\n\n```javascript\nconst response = await fetch('/api/resource', {\n  headers: {\n    'Authorization': 'Basic ' + btoa('username:password')\n  }\n});\n```\n\n## Token Authentication\n\nFor better security, use token authentication:\n\n1. Request a token by authenticating with credentials\n2. Store the token securely\n3. Include the token in subsequent requests\n\n```javascript\n// Request token\nconst auth = await fetch('/api/auth', {\n  method: 'POST',\n  body: JSON.stringify({ username, password })\n});\nconst { token } = await auth.json();\n\n// Use token\nconst response = await fetch('/api/resource', {\n  headers: {\n    'Authorization': `Bearer ${token}`\n  }\n});\n```",
        "# Data Encryption\n\nThis guide covers implementing data encryption in your application.\n\n## Client-Side Encryption\n\nUse the Web Crypto API for client-side encryption:\n\n```javascript\nasync function encryptData(data, key) {\n  const encodedData = new TextEncoder().encode(data);\n  const encryptedData = await window.crypto.subtle.encrypt(\n    { name: 'AES-GCM', iv: window.crypto.getRandomValues(new Uint8Array(12)) },\n    key,\n    encodedData\n  );\n  return encryptedData;\n}\n```\n\n## Transport Layer Security\n\nAlways use HTTPS to ensure data is encrypted in transit:\n\n- Obtain SSL/TLS certificates from a trusted CA\n- Configure your server to use TLS 1.3 when possible\n- Implement HSTS to prevent downgrade attacks\n\n## Database Encryption\n\nSensitive data should be encrypted before storage:\n\n- Use field-level encryption for PII\n- Store encryption keys separately from the data\n- Rotate encryption keys periodically",
        "# API Rate Limiting\n\nImplement rate limiting to protect your API from abuse and ensure fair usage.\n\n## Token Bucket Algorithm\n\nThe token bucket algorithm is a common approach:\n\n```javascript\nclass RateLimiter {\n  constructor(capacity, refillRate) {\n    this.capacity = capacity;\n    this.refillRate = refillRate;\n    this.tokens = capacity;\n    this.lastRefill = Date.now();\n  }\n\n  allowRequest() {\n    this.refill();\n    if (this.tokens >= 1) {\n      this.tokens -= 1;\n      return true;\n    }\n    return false;\n  }\n\n  refill() {\n    const now = Date.now();\n    const timePassed = (now - this.lastRefill) / 1000;\n    const newTokens = timePassed * this.refillRate;\n    this.tokens = Math.min(this.capacity, this.tokens + newTokens);\n    this.lastRefill = now;\n  }\n}\n```\n\n## Response Headers\n\nInclude rate limit information in response headers:\n\n```\nX-Rate-Limit-Limit: 100\nX-Rate-Limit-Remaining: 87\nX-Rate-Limit-Reset: 1605124924\n```"
      ]
    },
    social_media_posts: {
      content: [
        "Excited to announce our new cloud security features! Check out our blog for details. #CloudSecurity #ProductUpdate",
        "Our team will be at the Tech Conference next week. Stop by booth #42 to see our latest innovations and chat with our experts! #TechConf2023 #Networking",
        "We're aware of the sign-in issues some users are experiencing. Our team is working on a fix and we'll update you shortly. We apologize for any inconvenience.",
        "Congratulations to our amazing development team for the successful launch of version 3.5! Months of hard work has paid off with our most stable release yet. #ProductLaunch",
        "Customer spotlight: Read how Company XYZ improved their workflow efficiency by 35% using our platform. Link in bio. #CustomerSuccess #CaseStudy"
      ],
      hashtags: [
        "CloudSecurity,ProductUpdate",
        "TechConf2023,Networking",
        "ServiceUpdate,TechnicalIssue",
        "ProductLaunch,NewFeatures",
        "CustomerSuccess,CaseStudy"
      ]
    }
  };

  // Return empty array if dataset or column not found
  if (!samples[datasetId as keyof typeof samples] || 
      !samples[datasetId as keyof typeof samples][columnName as keyof typeof samples[keyof typeof samples]]) {
    return [];
  }

  return samples[datasetId as keyof typeof samples][columnName as keyof typeof samples[keyof typeof samples]];
};