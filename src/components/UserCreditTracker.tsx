import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  SkipForward, 
  Gift, 
  TrendingUp, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Users
} from "lucide-react";

interface UserCredit {
  userId: string;
  userName: string;
  email: string;
  skipCreditsRemaining: number;
  skipCreditsUsed: number;
  totalSkipCredits: number;
  referralCredits: number;
  totalReferrals: number;
  subscriptionPlan: string;
  joinDate: string;
  lastSkipUsed?: string;
  creditExpiryDate?: string;
}

const mockUserCredits: UserCredit[] = [
  {
    userId: "U247",
    userName: "Sarah K.",
    email: "sarah.k@email.com",
    skipCreditsRemaining: 6,
    skipCreditsUsed: 0,
    totalSkipCredits: 6,
    referralCredits: 2,
    totalReferrals: 3,
    subscriptionPlan: "Monthly Premium",
    joinDate: "2024-01-15"
  },
  {
    userId: "U156", 
    userName: "John D.",
    email: "john.d@email.com",
    skipCreditsRemaining: 3,
    skipCreditsUsed: 3,
    totalSkipCredits: 6,
    referralCredits: 1,
    totalReferrals: 2,
    subscriptionPlan: "Weekly Basic",
    joinDate: "2024-01-20",
    lastSkipUsed: "2024-01-22"
  },
  {
    userId: "U89",
    userName: "Mike R.", 
    email: "mike.r@email.com",
    skipCreditsRemaining: 2,
    skipCreditsUsed: 4,
    totalSkipCredits: 6,
    referralCredits: 5,
    totalReferrals: 8,
    subscriptionPlan: "Monthly Standard",
    joinDate: "2024-01-18",
    lastSkipUsed: "2024-01-24"
  },
  {
    userId: "U203",
    userName: "Sarah M.",
    email: "sarah.m@email.com", 
    skipCreditsRemaining: 0,
    skipCreditsUsed: 6,
    totalSkipCredits: 6,
    referralCredits: 0,
    totalReferrals: 1,
    subscriptionPlan: "Monthly Premium",
    joinDate: "2024-01-10",
    lastSkipUsed: "2024-01-23"
  },
  {
    userId: "U178",
    userName: "Lisa K.",
    email: "lisa.k@email.com",
    skipCreditsRemaining: 5,
    skipCreditsUsed: 1, 
    totalSkipCredits: 6,
    referralCredits: 3,
    totalReferrals: 4,
    subscriptionPlan: "Monthly Standard",
    joinDate: "2024-01-12",
    lastSkipUsed: "2024-01-20"
  }
];

export function UserCreditTracker() {
  const totalUsers = mockUserCredits.length;
  const usersWithNoSkips = mockUserCredits.filter(user => user.skipCreditsRemaining === 0).length;
  const usersWithLowSkips = mockUserCredits.filter(user => user.skipCreditsRemaining <= 2 && user.skipCreditsRemaining > 0).length;
  const totalReferralCredits = mockUserCredits.reduce((sum, user) => sum + user.referralCredits, 0);
  const averageSkipsUsed = (mockUserCredits.reduce((sum, user) => sum + user.skipCreditsUsed, 0) / totalUsers).toFixed(1);

  const getSkipCreditColor = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100;
    if (percentage === 0) return 'text-red-600';
    if (percentage <= 33) return 'text-orange-600';
    if (percentage <= 66) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getSkipCreditBadge = (remaining: number) => {
    if (remaining === 0) return <Badge variant="destructive" className="text-xs">No Skips</Badge>;
    if (remaining <= 2) return <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">Low</Badge>;
    return <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Available</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Users with No Skips</p>
              <p className="text-2xl font-bold text-foreground">{usersWithNoSkips}</p>
              <p className="text-xs text-red-600">Need attention</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <SkipForward className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Low Skip Credits</p>
              <p className="text-2xl font-bold text-foreground">{usersWithLowSkips}</p>
              <p className="text-xs text-orange-600">≤2 skips remaining</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Referral Credits</p>
              <p className="text-2xl font-bold text-foreground">{totalReferralCredits}</p>
              <p className="text-xs text-success">Total earned</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Skips Used</p>
              <p className="text-2xl font-bold text-foreground">{averageSkipsUsed}</p>
              <p className="text-xs text-muted-foreground">Per user</p>
            </div>
          </div>
        </Card>
      </div>

      {/* User Credit Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">User Credit Management</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Gift className="w-4 h-4 mr-2" />
              Add Credits
            </Button>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {mockUserCredits.map((user) => (
            <div key={user.userId} className="p-4 bg-secondary rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">User #{user.userId} - {user.userName}</span>
                      {getSkipCreditBadge(user.skipCreditsRemaining)}
                    </div>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.subscriptionPlan}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium">
                    Member since {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                  {user.lastSkipUsed && (
                    <div className="text-xs text-muted-foreground">
                      Last skip: {new Date(user.lastSkipUsed).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Skip Credits */}
                <div className="p-3 bg-background rounded border">
                  <div className="flex items-center gap-2 mb-2">
                    <SkipForward className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Skip Credits</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Remaining</span>
                    <span className={`text-sm font-bold ${getSkipCreditColor(user.skipCreditsRemaining, user.totalSkipCredits)}`}>
                      {user.skipCreditsRemaining}/{user.totalSkipCredits}
                    </span>
                  </div>
                  <Progress 
                    value={(user.skipCreditsRemaining / user.totalSkipCredits) * 100} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {user.skipCreditsUsed} used this cycle
                  </div>
                </div>
                
                {/* Referral Credits */}
                <div className="p-3 bg-background rounded border">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Referral Credits</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Available</span>
                    <span className="text-sm font-bold text-purple-600">
                      {user.referralCredits}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    From {user.totalReferrals} referrals
                  </div>
                </div>
                
                {/* Account Status */}
                <div className="p-3 bg-background rounded border">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Account Status</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Active</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.subscriptionPlan}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <SkipForward className="w-4 h-4 mr-2" />
                  Add Skip Credits
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Gift className="w-4 h-4 mr-2" />
                  Add Referral Credits
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  View History
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Credit Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Skip Credit Usage Patterns</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">0 skips used</span>
              <span className="text-sm font-medium">
                {mockUserCredits.filter(u => u.skipCreditsUsed === 0).length} users
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">1-2 skips used</span>
              <span className="text-sm font-medium">
                {mockUserCredits.filter(u => u.skipCreditsUsed >= 1 && u.skipCreditsUsed <= 2).length} users
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">3-4 skips used</span>
              <span className="text-sm font-medium">
                {mockUserCredits.filter(u => u.skipCreditsUsed >= 3 && u.skipCreditsUsed <= 4).length} users
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">5-6 skips used</span>
              <span className="text-sm font-medium">
                {mockUserCredits.filter(u => u.skipCreditsUsed >= 5).length} users
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Referral Program Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Referrals</span>
              <span className="text-lg font-bold text-foreground">
                {mockUserCredits.reduce((sum, user) => sum + user.totalReferrals, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Referrers</span>
              <span className="text-lg font-bold text-foreground">
                {mockUserCredits.filter(u => u.totalReferrals > 0).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Referrals per User</span>
              <span className="text-lg font-bold text-foreground">
                {(mockUserCredits.reduce((sum, user) => sum + user.totalReferrals, 0) / totalUsers).toFixed(1)}
              </span>
            </div>
            <Button size="sm" variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Manage Referral Program
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}