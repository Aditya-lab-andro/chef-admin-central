import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  ChefHat, 
  Clock, 
  TrendingUp, 
  Users, 
  UtensilsCrossed,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your Tiffix operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-vendor">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Vendor Food</p>
              <p className="text-2xl font-bold text-white">23</p>
              <p className="text-xs text-white/70">Active providers</p>
            </div>
            <Building2 className="w-8 h-8 text-white/80" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-chef">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Home Chef</p>
              <p className="text-2xl font-bold text-white">18</p>
              <p className="text-xs text-white/70">Active chefs</p>
            </div>
            <ChefHat className="w-8 h-8 text-white/80" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today's Orders</p>
              <p className="text-2xl font-bold text-foreground">147</p>
              <p className="text-xs text-success">+12% from yesterday</p>
            </div>
            <UtensilsCrossed className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-foreground">1,247</p>
              <p className="text-xs text-success">+8% this week</p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <UtensilsCrossed className="w-6 h-6" />
              <span className="text-sm">Add Menu Item</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Building2 className="w-6 h-6" />
              <span className="text-sm">Add Provider</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Clock className="w-6 h-6" />
              <span className="text-sm">Meal Scheduler</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">View Analytics</span>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-success" />
              <div className="flex-1">
                <p className="text-sm text-foreground">New meal added to Vendor Food menu</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Provider switch requested for Order #1247</p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-success" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Home Chef #HC-18 completed certification</p>
                <p className="text-xs text-muted-foreground">12 minutes ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Today's Meal Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Breakfast</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm">Masala Omelette</span>
                <Badge variant="outline" className="text-xs">Vendor</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm">Avocado Toast</span>
                <Badge variant="secondary" className="text-xs">Home Chef</Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Lunch</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm">Chicken Biryani</span>
                <Badge variant="outline" className="text-xs">Vendor</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm">Quinoa Salad</span>
                <Badge variant="secondary" className="text-xs">Home Chef</Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Dinner</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm">Butter Chicken</span>
                <Badge variant="outline" className="text-xs">Vendor</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm">Grilled Salmon</span>
                <Badge variant="secondary" className="text-xs">Home Chef</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}