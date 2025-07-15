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
  CheckCircle,
  ClipboardList,
  UserCheck,
  RefreshCw,
  CreditCard,
  X,
  SkipForward,
  ArrowRightLeft,
  Calendar,
  Menu
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
              <p className="text-sm font-medium text-muted-foreground">Pending Assignments</p>
              <p className="text-2xl font-bold text-foreground">23</p>
              <p className="text-xs text-warning">Need provider assignment</p>
            </div>
            <ClipboardList className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">User Requests</p>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-xs text-warning">Skip/Cancel/Switch pending</p>
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
              <UserCheck className="w-6 h-6" />
              <span className="text-sm">Assign Meals</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <RefreshCw className="w-6 h-6" />
              <span className="text-sm">Manage Requests</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Menu className="w-6 h-6" />
              <span className="text-sm">Update Menus</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CreditCard className="w-6 h-6" />
              <span className="text-sm">Subscription Plans</span>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-success" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Weekly meals assigned to user #U247</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="w-4 h-4 text-warning" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Switch request: User #U156 to different vendor</p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SkipForward className="w-4 h-4 text-info" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Skip meal request for Tuesday - User #U89</p>
                <p className="text-xs text-muted-foreground">8 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <X className="w-4 h-4 text-destructive" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Cancel meal request for Thursday - User #U203</p>
                <p className="text-xs text-muted-foreground">12 minutes ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Meal Assignment Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Pending Meal Assignments</h3>
          <div className="space-y-3">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">User #U247 - Sarah K.</span>
                <Badge variant="outline" className="text-xs">Pending</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                7 meals selected (5 Vendor Food, 2 Home Chef)
              </div>
              <Button size="sm" className="w-full">Assign Providers</Button>
            </div>
            
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">User #U156 - John D.</span>
                <Badge variant="outline" className="text-xs">Pending</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                7 meals selected (3 Vendor Food, 4 Home Chef)
              </div>
              <Button size="sm" className="w-full">Assign Providers</Button>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">User #U89 - Mike R.</span>
                <Badge variant="outline" className="text-xs">Pending</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                7 meals selected (6 Vendor Food, 1 Home Chef)
              </div>
              <Button size="sm" className="w-full">Assign Providers</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">User Requests Queue</h3>
          <div className="space-y-3">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Switch Request</span>
                <Badge variant="destructive" className="text-xs">Urgent</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                User #U156 - Switch vendor for remaining 4 meals
              </div>
              <Button size="sm" variant="outline" className="w-full">Process Request</Button>
            </div>
            
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Skip Request</span>
                <Badge variant="secondary" className="text-xs">Normal</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                User #U89 - Skip Tuesday meal (5 skips remaining)
              </div>
              <Button size="sm" variant="outline" className="w-full">Approve Skip</Button>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Cancel Request</span>
                <Badge variant="outline" className="text-xs">Normal</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                User #U203 - Cancel Thursday meal (no credit)
              </div>
              <Button size="sm" variant="outline" className="w-full">Confirm Cancel</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Assignment Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Assignment Overview</h3>
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="text-center">
              <h4 className="font-medium text-foreground mb-2">{day}</h4>
              <div className="space-y-2">
                <div className="p-2 bg-gradient-vendor rounded text-white text-xs">
                  Vendor: 45 orders
                </div>
                <div className="p-2 bg-gradient-chef rounded text-white text-xs">
                  Chef: 23 orders
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 20 + 60)}% assigned
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}