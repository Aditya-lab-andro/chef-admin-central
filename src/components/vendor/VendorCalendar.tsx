import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Package, Truck } from "lucide-react";
import { format } from "date-fns";

interface CalendarOrder {
  id: string;
  customer: string;
  items: number;
  type: "Pickup" | "Delivery";
  time: string;
  amount: number;
}

const mockCalendarData: Record<string, CalendarOrder[]> = {
  "2024-01-15": [
    { id: "#1234", customer: "John Doe", items: 3, type: "Delivery", time: "12:30 PM", amount: 180 },
    { id: "#1235", customer: "Jane Smith", items: 2, type: "Pickup", time: "1:00 PM", amount: 120 },
  ],
  "2024-01-16": [
    { id: "#1236", customer: "Mike Johnson", items: 1, type: "Delivery", time: "11:30 AM", amount: 60 },
    { id: "#1237", customer: "Sarah Wilson", items: 4, type: "Delivery", time: "2:00 PM", amount: 240 },
  ],
  "2024-01-17": [
    { id: "#1238", customer: "David Brown", items: 2, type: "Pickup", time: "1:30 PM", amount: 140 },
  ],
};

export function VendorCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterType, setFilterType] = useState<string>("all");

  const getOrdersForDate = (date: Date | undefined) => {
    if (!date) return [];
    const dateStr = format(date, "yyyy-MM-dd");
    const orders = mockCalendarData[dateStr] || [];
    
    if (filterType === "all") return orders;
    return orders.filter(order => order.type === filterType);
  };

  const hasOrdersOnDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return mockCalendarData[dateStr] && mockCalendarData[dateStr].length > 0;
  };

  const getTotalOrdersForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return mockCalendarData[dateStr]?.length || 0;
  };

  const selectedDateOrders = getOrdersForDate(selectedDate);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order Calendar</h1>
        <div className="flex items-center gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="Delivery">Delivery Only</SelectItem>
              <SelectItem value="Pickup">Pickup Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Order Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full"
              modifiers={{
                hasOrders: (date) => hasOrdersOnDate(date),
              }}
              modifiersStyles={{
                hasOrders: {
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  fontWeight: 'bold',
                },
              }}
              components={{
                DayContent: ({ date, ...props }) => (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span {...props}>{date.getDate()}</span>
                    {hasOrdersOnDate(date) && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {getTotalOrdersForDate(date)}
                      </div>
                    )}
                  </div>
                ),
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "Select a date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateOrders.length > 0 ? (
              <div className="space-y-3">
                {selectedDateOrders.map((order) => (
                  <div key={order.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{order.id}</span>
                        <Badge variant={order.type === "Delivery" ? "default" : "secondary"}>
                          {order.type === "Delivery" ? <Truck className="h-3 w-3 mr-1" /> : <Package className="h-3 w-3 mr-1" />}
                          {order.type}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium">₹{order.amount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.items} items • {order.time}</p>
                  </div>
                ))}
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Orders:</span>
                    <span className="font-bold">{selectedDateOrders.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Revenue:</span>
                    <span className="font-bold">₹{selectedDateOrders.reduce((sum, order) => sum + order.amount, 0)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No orders scheduled for this date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}