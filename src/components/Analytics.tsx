import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Star,
  Calendar,
  Clock,
  MapPin,
  UtensilsCrossed
} from "lucide-react";

export function Analytics() {
  // Mock data for analytics
  const overviewStats = {
    totalRevenue: 125000,
    revenueChange: 12.5,
    totalOrders: 1847,
    ordersChange: 8.3,
    activeUsers: 524,
    usersChange: 15.7,
    averageRating: 4.7,
    ratingChange: 2.1
  };

  const monthlyData = [
    { month: 'Jan', revenue: 85000, orders: 1200, users: 450 },
    { month: 'Feb', revenue: 92000, orders: 1350, users: 480 },
    { month: 'Mar', revenue: 98000, orders: 1450, users: 510 },
    { month: 'Apr', revenue: 105000, orders: 1550, users: 520 },
    { month: 'May', revenue: 115000, orders: 1700, users: 540 },
    { month: 'Jun', revenue: 125000, orders: 1847, users: 524 }
  ];

  const topProviders = [
    { id: 'V001', name: 'Spice Palace', type: 'vendor', orders: 234, revenue: 28000, rating: 4.8 },
    { id: 'C001', name: 'Chef Maria', type: 'chef', orders: 189, revenue: 22500, rating: 4.9 },
    { id: 'V002', name: 'Taste Hub', type: 'vendor', orders: 178, revenue: 21000, rating: 4.6 },
    { id: 'C002', name: 'Chef Kumar', type: 'chef', orders: 145, revenue: 18700, rating: 4.7 }
  ];

  const popularItems = [
    { name: 'Chicken Biryani', orders: 189, revenue: 28350, provider: 'Spice Palace' },
    { name: 'Mediterranean Bowl', orders: 156, revenue: 28080, provider: 'Chef Maria' },
    { name: 'Margherita Pizza', orders: 134, revenue: 16080, provider: 'Taste Hub' },
    { name: 'Dal Makhani', orders: 112, revenue: 11200, provider: 'Chef Kumar' }
  ];

  const zonePerformance = [
    { zone: 'Bangalore Tech Corridor', orders: 456, revenue: 68400, agents: 12, rating: 4.8 },
    { zone: 'Mumbai Business District', orders: 523, revenue: 78450, agents: 15, rating: 4.6 },
    { zone: 'Delhi NCR Central', orders: 378, revenue: 56700, agents: 10, rating: 4.7 },
    { zone: 'Hyderabad HITEC City', orders: 289, revenue: 43350, agents: 8, rating: 4.5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into your Tiffix operations
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">₹{overviewStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">+{overviewStats.revenueChange}%</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">{overviewStats.totalOrders.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">+{overviewStats.ordersChange}%</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-foreground">{overviewStats.activeUsers}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">+{overviewStats.usersChange}%</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
              <p className="text-2xl font-bold text-foreground">{overviewStats.averageRating}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600">+{overviewStats.ratingChange}%</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="menu">Menu Items</TabsTrigger>
          <TabsTrigger value="zones">Service Zones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Revenue Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
            <div className="h-64 flex items-end justify-between gap-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-primary rounded-t"
                    style={{ height: `${(data.revenue / 125000) * 200}px` }}
                  />
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium">{data.month}</p>
                    <p className="text-xs text-muted-foreground">₹{(data.revenue / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Orders and Users Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Orders</h3>
              <div className="h-48 flex items-end justify-between gap-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(data.orders / 1847) * 150}px` }}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium">{data.month}</p>
                      <p className="text-xs text-muted-foreground">{data.orders}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Active Users Growth</h3>
              <div className="h-48 flex items-end justify-between gap-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-purple-500 rounded-t"
                      style={{ height: `${(data.users / 540) * 150}px` }}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium">{data.month}</p>
                      <p className="text-xs text-muted-foreground">{data.users}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="providers" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Providers</h3>
            <div className="space-y-4">
              {topProviders.map((provider, index) => (
                <div key={provider.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{provider.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-right">
                    <div>
                      <p className="font-semibold">{provider.orders}</p>
                      <p className="text-xs text-muted-foreground">Orders</p>
                    </div>
                    <div>
                      <p className="font-semibold">₹{provider.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-semibold">{provider.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="menu" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Most Popular Menu Items</h3>
            <div className="space-y-4">
              {popularItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <UtensilsCrossed className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-right">
                    <div>
                      <p className="font-semibold">{item.orders}</p>
                      <p className="text-xs text-muted-foreground">Orders</p>
                    </div>
                    <div>
                      <p className="font-semibold">₹{item.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Service Zone Performance</h3>
            <div className="space-y-4">
              {zonePerformance.map((zone, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{zone.zone}</p>
                      <p className="text-sm text-muted-foreground">{zone.agents} delivery agents</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-right">
                    <div>
                      <p className="font-semibold">{zone.orders}</p>
                      <p className="text-xs text-muted-foreground">Orders</p>
                    </div>
                    <div>
                      <p className="font-semibold">₹{zone.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-semibold">{zone.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}