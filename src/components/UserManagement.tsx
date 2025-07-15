import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  UserCheck, 
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Star,
  TrendingUp,
  SkipForward,
  Gift
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  subscriptionPlan: string;
  subscriptionStatus: 'active' | 'expired' | 'cancelled';
  totalOrders: number;
  totalSpent: number;
  averageRating: number;
  skipCreditsRemaining: number;
  referralCredits: number;
  lastOrderDate?: string;
  preferences: {
    cuisines: string[];
    dietary: string[];
    spiceLevel: 'mild' | 'medium' | 'hot';
  };
  deliveryInstructions?: string;
  status: 'active' | 'inactive' | 'blocked';
  accountType: 'individual' | 'corporate';
}

const mockUsers: User[] = [
  {
    id: "U247",
    name: "Sarah K.",
    email: "sarah.k@email.com",
    phone: "+91 98765 43210",
    address: "123 Tech Park, Bangalore, KA 560001",
    joinDate: "2024-01-15",
    subscriptionPlan: "Monthly Premium",
    subscriptionStatus: "active",
    totalOrders: 45,
    totalSpent: 6750,
    averageRating: 4.8,
    skipCreditsRemaining: 6,
    referralCredits: 2,
    lastOrderDate: "2024-01-25",
    preferences: {
      cuisines: ["Indian", "Mediterranean", "Continental"],
      dietary: ["Vegetarian"],
      spiceLevel: "medium"
    },
    deliveryInstructions: "Ring doorbell twice, leave at door",
    status: "active",
    accountType: "individual"
  },
  {
    id: "U156",
    name: "John D.",
    email: "john.d@email.com",
    phone: "+91 87654 32109",
    address: "456 Business District, Mumbai, MH 400001",
    joinDate: "2024-01-20",
    subscriptionPlan: "Weekly Basic",
    subscriptionStatus: "active",
    totalOrders: 28,
    totalSpent: 4200,
    averageRating: 4.6,
    skipCreditsRemaining: 3,
    referralCredits: 1,
    lastOrderDate: "2024-01-24",
    preferences: {
      cuisines: ["Chinese", "Italian", "Fast Food"],
      dietary: ["Non-Vegetarian"],
      spiceLevel: "hot"
    },
    status: "active",
    accountType: "individual"
  },
  {
    id: "U89",
    name: "Mike R.",
    email: "mike.r@email.com",
    phone: "+91 76543 21098",
    address: "789 Residential Area, Delhi, DL 110001",
    joinDate: "2024-01-18",
    subscriptionPlan: "Monthly Standard",
    subscriptionStatus: "active",
    totalOrders: 67,
    totalSpent: 10050,
    averageRating: 4.9,
    skipCreditsRemaining: 2,
    referralCredits: 5,
    lastOrderDate: "2024-01-25",
    preferences: {
      cuisines: ["Indian", "South Indian", "Traditional"],
      dietary: ["Vegetarian", "Vegan"],
      spiceLevel: "mild"
    },
    deliveryInstructions: "Call before delivery",
    status: "active",
    accountType: "individual"
  },
  {
    id: "U203",
    name: "Sarah M.",
    email: "sarah.m@email.com",
    phone: "+91 65432 10987",
    address: "321 Green Valley, Pune, MH 411001",
    joinDate: "2024-01-10",
    subscriptionPlan: "Monthly Premium",
    subscriptionStatus: "expired",
    totalOrders: 89,
    totalSpent: 13350,
    averageRating: 4.7,
    skipCreditsRemaining: 0,
    referralCredits: 0,
    lastOrderDate: "2024-01-20",
    preferences: {
      cuisines: ["Mediterranean", "Healthy", "Continental"],
      dietary: ["Gluten-Free", "Low-Carb"],
      spiceLevel: "mild"
    },
    status: "inactive",
    accountType: "individual"
  },
  {
    id: "U345",
    name: "TechCorp Office",
    email: "orders@techcorp.com",
    phone: "+91 54321 09876",
    address: "Corporate Tower, IT Park, Hyderabad, TS 500001",
    joinDate: "2023-12-01",
    subscriptionPlan: "Corporate Enterprise",
    subscriptionStatus: "active",
    totalOrders: 234,
    totalSpent: 35100,
    averageRating: 4.5,
    skipCreditsRemaining: 15,
    referralCredits: 0,
    lastOrderDate: "2024-01-25",
    preferences: {
      cuisines: ["Indian", "Continental", "Chinese", "Italian"],
      dietary: ["Mixed"],
      spiceLevel: "medium"
    },
    deliveryInstructions: "Deliver to reception desk",
    status: "active",
    accountType: "corporate"
  }
];

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getSubscriptionStatusColor = (status: User['subscriptionStatus']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeUsers = users.filter(user => user.status === 'active');
  const inactiveUsers = users.filter(user => user.status === 'inactive');
  const corporateUsers = users.filter(user => user.accountType === 'corporate');
  const premiumUsers = users.filter(user => user.subscriptionPlan.includes('Premium'));

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer accounts and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-foreground">{activeUsers.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Premium Users</p>
              <p className="text-2xl font-bold text-foreground">{premiumUsers.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Corporate Accounts</p>
              <p className="text-2xl font-bold text-foreground">{corporateUsers.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
              <p className="text-2xl font-bold text-foreground">
                {(users.reduce((sum, user) => sum + user.averageRating, 0) / users.length).toFixed(1)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search by name, email, or user ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* User Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Users ({users.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeUsers.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({inactiveUsers.length})</TabsTrigger>
          <TabsTrigger value="corporate">Corporate ({corporateUsers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge className={getUserStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">User #{user.id}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{user.averageRating}</span>
                        <span className="text-xs text-muted-foreground">• {user.totalOrders} orders</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge className={getSubscriptionStatusColor(user.subscriptionStatus)}>
                      {user.subscriptionPlan}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {user.accountType}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {user.address}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                    <p className="font-semibold">₹{user.totalSpent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Order</p>
                    <p className="font-semibold">
                      {user.lastOrderDate ? new Date(user.lastOrderDate).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Favorite Cuisines</p>
                    <div className="flex flex-wrap gap-1">
                      {user.preferences.cuisines.slice(0, 3).map((cuisine, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cuisine}
                        </Badge>
                      ))}
                      {user.preferences.cuisines.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{user.preferences.cuisines.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <SkipForward className="w-3 h-3" />
                      <span>{user.skipCreditsRemaining} skips left</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      <span>{user.referralCredits} referral credits</span>
                    </div>
                  </div>
                  
                  {user.deliveryInstructions && (
                    <div>
                      <p className="text-xs text-muted-foreground">Delivery Instructions</p>
                      <p className="text-xs">{user.deliveryInstructions}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeUsers.map((user) => (
              <Card key={user.id} className="p-6">
                {/* Same card structure for active users */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {inactiveUsers.map((user) => (
              <Card key={user.id} className="p-6">
                {/* Same card structure for inactive users */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="corporate">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {corporateUsers.map((user) => (
              <Card key={user.id} className="p-6">
                {/* Same card structure for corporate users */}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}