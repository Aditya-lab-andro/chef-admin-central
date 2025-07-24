import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Bell, 
  Send, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Target,
  MessageSquare,
  History,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  body: string;
  category: string;
}

interface NotificationHistory {
  id: string;
  title: string;
  body: string;
  targetAudience: string;
  sentAt: string;
  deliveredCount: number;
  readCount: number;
  status: 'sent' | 'failed' | 'scheduled';
}

const mockTemplates: NotificationTemplate[] = [
  {
    id: '1',
    name: 'Order Ready',
    title: 'Your order is ready! 🍽️',
    body: 'Your delicious meal is ready for pickup/delivery.',
    category: 'Order Updates'
  },
  {
    id: '2',
    name: 'Daily Special',
    title: 'Today\'s Special Menu ✨',
    body: 'Check out our chef\'s special for today!',
    category: 'Promotions'
  },
  {
    id: '3',
    name: 'Welcome',
    title: 'Welcome to Tiffix! 👋',
    body: 'Thank you for joining our food community.',
    category: 'Onboarding'
  }
];

const mockHistory: NotificationHistory[] = [
  {
    id: '1',
    title: 'Weekend Special Offer',
    body: 'Get 20% off on all weekend orders!',
    targetAudience: 'All Active Users',
    sentAt: '2024-01-20 10:30 AM',
    deliveredCount: 1250,
    readCount: 876,
    status: 'sent'
  },
  {
    id: '2',
    title: 'Your order is ready',
    body: 'Order #ORD123 is ready for pickup',
    targetAudience: 'Individual User',
    sentAt: '2024-01-20 09:15 AM',
    deliveredCount: 1,
    readCount: 1,
    status: 'sent'
  }
];

export function PushNotificationManagement() {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [scheduleType, setScheduleType] = useState('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [templates, setTemplates] = useState<NotificationTemplate[]>(mockTemplates);
  const [history, setHistory] = useState<NotificationHistory[]>(mockHistory);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    title: '',
    body: '',
    category: ''
  });

  const handleSendNotification = () => {
    if (!title || !body) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending notification
    const newNotification: NotificationHistory = {
      id: Date.now().toString(),
      title,
      body,
      targetAudience: getAudienceLabel(targetAudience),
      sentAt: new Date().toLocaleString(),
      deliveredCount: targetAudience === 'all' ? 1500 : targetAudience === 'active' ? 800 : 1,
      readCount: 0,
      status: scheduleType === 'now' ? 'sent' : 'scheduled'
    };

    setHistory([newNotification, ...history]);
    
    toast({
      title: "Success",
      description: scheduleType === 'now' ? "Notification sent successfully!" : "Notification scheduled successfully!",
    });

    // Reset form
    setTitle('');
    setBody('');
    setSelectedTemplate('');
  };

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case 'all': return 'All Users';
      case 'active': return 'Active Users';
      case 'inactive': return 'Inactive Users';
      case 'premium': return 'Premium Users';
      default: return 'Custom Segment';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="default" className="gap-1"><CheckCircle className="h-3 w-3" />Sent</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Failed</Badge>;
      case 'scheduled':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Scheduled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setTitle(template.title);
      setBody(template.body);
      setSelectedTemplate(templateId);
    }
  };

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.title || !newTemplate.body) {
      toast({
        title: "Error",
        description: "Please fill in all template fields",
        variant: "destructive"
      });
      return;
    }

    const template: NotificationTemplate = {
      id: Date.now().toString(),
      ...newTemplate
    };

    setTemplates([...templates, template]);
    setNewTemplate({ name: '', title: '', body: '', category: '' });
    setIsTemplateDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Template saved successfully!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Push Notifications</h1>
          <p className="text-muted-foreground">Send notifications to your mobile app users</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            {history.filter(h => h.status === 'sent').length} Sent Today
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">2,450</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{history.filter(h => h.status === 'sent').length}</p>
                <p className="text-sm text-muted-foreground">Sent Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {history.reduce((acc, h) => acc + h.readCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Reads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{templates.length}</p>
                <p className="text-sm text-muted-foreground">Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="send" className="space-y-6">
        <TabsList>
          <TabsTrigger value="send" className="gap-2">
            <Send className="h-4 w-4" />
            Send Notification
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Send Notification Tab */}
        <TabsContent value="send" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Compose Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Compose Notification
                  </CardTitle>
                  <CardDescription>
                    Create and send push notifications to your app users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Template Selection */}
                  <div className="space-y-2">
                    <Label>Use Template (Optional)</Label>
                    <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name} - {template.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter notification title"
                      maxLength={50}
                    />
                    <p className="text-xs text-muted-foreground">{title.length}/50 characters</p>
                  </div>

                  {/* Body */}
                  <div className="space-y-2">
                    <Label htmlFor="body">Message *</Label>
                    <Textarea
                      id="body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Enter notification message"
                      rows={4}
                      maxLength={200}
                    />
                    <p className="text-xs text-muted-foreground">{body.length}/200 characters</p>
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Select value={targetAudience} onValueChange={setTargetAudience}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users (2,450)</SelectItem>
                        <SelectItem value="active">Active Users (1,800)</SelectItem>
                        <SelectItem value="inactive">Inactive Users (650)</SelectItem>
                        <SelectItem value="premium">Premium Users (320)</SelectItem>
                        <SelectItem value="custom">Custom Segment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Schedule Options */}
                  <div className="space-y-2">
                    <Label>Schedule</Label>
                    <Select value={scheduleType} onValueChange={setScheduleType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Send Now</SelectItem>
                        <SelectItem value="schedule">Schedule for Later</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {scheduleType === 'schedule' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <Button onClick={handleSendNotification} className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    {scheduleType === 'now' ? 'Send Notification' : 'Schedule Notification'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>How your notification will appear</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-card space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Bell className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Tiffix</p>
                        <p className="text-xs text-muted-foreground">now</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{title || 'Notification Title'}</p>
                      <p className="text-sm text-muted-foreground">{body || 'Notification message will appear here...'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notification Templates</h3>
            <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                  <DialogDescription>
                    Save frequently used notification content as templates
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      placeholder="e.g., Order Ready"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-category">Category</Label>
                    <Input
                      id="template-category"
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                      placeholder="e.g., Order Updates"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-title">Title</Label>
                    <Input
                      id="template-title"
                      value={newTemplate.title}
                      onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                      placeholder="Notification title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-body">Message</Label>
                    <Textarea
                      id="template-body"
                      value={newTemplate.body}
                      onChange={(e) => setNewTemplate({...newTemplate, body: e.target.value})}
                      placeholder="Notification message"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleSaveTemplate} className="w-full">
                    Save Template
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription>{template.category}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-sm">{template.title}</p>
                    <p className="text-sm text-muted-foreground">{template.body}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => {
                      handleTemplateSelect(template.id);
                      // Switch to send tab
                      const sendTab = document.querySelector('[data-state="active"][value="send"]') as HTMLElement;
                      if (sendTab) sendTab.click();
                    }}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>
                View all sent and scheduled notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Target Audience</TableHead>
                    <TableHead>Sent At</TableHead>
                    <TableHead>Delivered</TableHead>
                    <TableHead>Read</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-48">
                            {notification.body}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{notification.targetAudience}</TableCell>
                      <TableCell>{notification.sentAt}</TableCell>
                      <TableCell>{notification.deliveredCount.toLocaleString()}</TableCell>
                      <TableCell>{notification.readCount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(notification.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}