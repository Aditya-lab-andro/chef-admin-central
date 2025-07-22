import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarDays, Package, Truck, Map, MapPin, Maximize, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, getDay } from "date-fns";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface CalendarOrder {
  id: string;
  customer: string;
  items: number;
  type: "Pickup" | "Delivery";
  time: string;
  amount: number;
  status: "Preparing" | "Ready" | "Picked Up" | "Delivered" | "Cancelled";
  providerType: "Vendor" | "Home Chef";
  mealName: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
}

const mockCalendarData: Record<string, CalendarOrder[]> = {
  "2024-01-15": [
    { 
      id: "#1234", 
      customer: "John Doe", 
      items: 3, 
      type: "Delivery", 
      time: "12:30 PM", 
      amount: 180,
      status: "Preparing",
      providerType: "Vendor",
      mealName: "Chicken Biryani",
      address: "123 Main St, Mumbai",
      coordinates: [72.8777, 19.0760]
    },
    { 
      id: "#1235", 
      customer: "Jane Smith", 
      items: 2, 
      type: "Pickup", 
      time: "1:00 PM", 
      amount: 120,
      status: "Ready",
      providerType: "Home Chef",
      mealName: "Dal Rice",
      address: "456 Park Ave, Mumbai",
      coordinates: [72.8800, 19.0800]
    },
  ],
  "2024-01-16": [
    { 
      id: "#1236", 
      customer: "Mike Johnson", 
      items: 1, 
      type: "Delivery", 
      time: "11:30 AM", 
      amount: 60,
      status: "Picked Up",
      providerType: "Vendor",
      mealName: "Veggie Thali",
      address: "789 Oak Rd, Mumbai",
      coordinates: [72.8850, 19.0900]
    },
    { 
      id: "#1237", 
      customer: "Sarah Wilson", 
      items: 4, 
      type: "Delivery", 
      time: "2:00 PM", 
      amount: 240,
      status: "Delivered",
      providerType: "Home Chef",
      mealName: "Mutton Curry",
      address: "321 Pine St, Mumbai",
      coordinates: [72.8900, 19.1000]
    },
  ],
  "2024-01-17": [
    { 
      id: "#1238", 
      customer: "David Brown", 
      items: 2, 
      type: "Pickup", 
      time: "1:30 PM", 
      amount: 140,
      status: "Cancelled",
      providerType: "Vendor",
      mealName: "Fish Curry",
      address: "654 Cedar Ln, Mumbai",
      coordinates: [72.8750, 19.0850]
    },
  ],
};

export function VendorCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<string>("all");
  const [isFullscreenMap, setIsFullscreenMap] = useState(false);
  const [mapboxToken, setMapboxToken] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<CalendarOrder | null>(null);
  const [highlightedOrder, setHighlightedOrder] = useState<CalendarOrder | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

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

  const getStatusDotsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const orders = mockCalendarData[dateStr] || [];
    const statusCounts: Record<string, number> = {};
    orders.forEach(order => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    return statusCounts;
  };

  const selectedDateOrders = getOrdersForDate(selectedDate);
  const allOrders = Object.values(mockCalendarData).flat();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Preparing": return "#f59e0b";
      case "Ready": return "#ea580c";
      case "Picked Up": return "#3b82f6";
      case "Delivered": return "#059669";
      case "Cancelled": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "Preparing": return "🟡";
      case "Ready": return "🟠";
      case "Picked Up": return "🔵";
      case "Delivered": return "🟢";
      case "Cancelled": return "🔴";
      default: return "⚪";
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [72.8777, 19.0760], // Mumbai center
      zoom: 12,
      pitch: 0,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Add markers when orders change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const ordersToShow = isFullscreenMap ? allOrders : selectedDateOrders;

    ordersToShow.forEach((order) => {
      // Create marker element
      const markerEl = document.createElement('div');
      const isHighlighted = highlightedOrder?.id === order.id;
      markerEl.className = `relative cursor-pointer transition-transform ${isHighlighted ? 'scale-125 z-10' : 'hover:scale-110'}`;
      markerEl.innerHTML = `
        <div class="relative">
          <div class="w-10 h-10 bg-white border-3 ${isHighlighted ? 'border-blue-500' : 'border-gray-300'} rounded-full flex items-center justify-center shadow-lg transition-all">
            <div class="text-lg">${getStatusEmoji(order.status)}</div>
          </div>
          <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-semibold text-white rounded whitespace-nowrap shadow-md" 
               style="background-color: ${getStatusColor(order.status)}">
            ${order.status}
          </div>
        </div>
      `;

      // Create popup content
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-4 min-w-[250px]">
          <div class="flex items-center justify-between mb-3">
            <span class="font-bold text-lg">${order.id}</span>
            <span class="px-2 py-1 text-xs rounded text-white" style="background-color: ${getStatusColor(order.status)}">
              ${getStatusEmoji(order.status)} ${order.status}
            </span>
          </div>
          <div class="space-y-2 text-sm">
            <p><strong>Customer:</strong> ${order.customer}</p>
            <p><strong>Provider Type:</strong> ${order.providerType}</p>
            <p><strong>Meal Name:</strong> ${order.mealName}</p>
            <p><strong>Delivery Time:</strong> ${order.time}</p>
            <p><strong>Delivery Address:</strong> ${order.address}</p>
            <p class="text-lg font-bold text-green-600">₹${order.amount}</p>
          </div>
        </div>
      `);

      // Add marker to map
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(order.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);

      // Handle marker click
      markerEl.addEventListener('click', () => {
        setSelectedOrder(order);
        setHighlightedOrder(order);
      });
    });
  }, [selectedDateOrders, allOrders, isFullscreenMap, highlightedOrder]);

  // Custom calendar rendering
  const renderCustomCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Add padding days from previous month
    const startDay = getDay(monthStart);
    const paddingDays = Array.from({ length: startDay }, (_, i) => {
      const day = new Date(monthStart);
      day.setDate(day.getDate() - (startDay - i));
      return day;
    });

    const allDays = [...paddingDays, ...daysInMonth];
    
    return (
      <div className="bg-white rounded-lg border">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentMonth(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {allDays.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            const isCurrentDay = isToday(day);
            const hasOrders = hasOrdersOnDate(day);
            const statusDots = getStatusDotsForDate(day);
            
            return (
              <div
                key={index}
                className={`min-h-[80px] p-2 border-b border-r cursor-pointer hover:bg-muted/50 transition-colors ${
                  !isCurrentMonth ? 'text-muted-foreground bg-muted/20' : ''
                } ${isSelected ? 'bg-primary/10 border-primary' : ''} ${
                  isCurrentDay ? 'bg-blue-50' : ''
                }`}
                onClick={() => setSelectedDate(day)}
              >
                <div className={`text-sm font-medium mb-1 ${isCurrentDay ? 'text-blue-600 font-bold' : ''}`}>
                  {day.getDate()}
                </div>
                {hasOrders && (
                  <div className="space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(statusDots).map(([status, count]) => (
                        <div
                          key={status}
                          className="flex items-center gap-1"
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getStatusColor(status) }}
                          />
                          <span className="text-xs">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`${isFullscreenMap ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      <div className={`${isFullscreenMap ? 'h-full flex flex-col' : 'p-6 space-y-6'}`}>
        {/* Header */}
        <div className={`flex items-center justify-between ${isFullscreenMap ? 'p-6 border-b' : ''}`}>
          <h1 className="text-3xl font-bold">🧭 Calendar & Map</h1>
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
            {mapboxToken && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreenMap(!isFullscreenMap)}
              >
                {isFullscreenMap ? <Minimize2 className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                {isFullscreenMap ? "Exit Fullscreen" : "Fullscreen Map"}
              </Button>
            )}
          </div>
        </div>

        {/* Mapbox Token Input */}
        {!mapboxToken && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                <p className="text-sm font-medium text-orange-800">
                  Enter your Mapbox public token to view the map
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwi..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (mapboxToken) {
                      localStorage.setItem('mapbox-token', mapboxToken);
                    }
                  }}
                  size="sm"
                >
                  Save
                </Button>
              </div>
              <p className="text-xs text-orange-600 mt-1">
                Get your token from{" "}
                <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">
                  mapbox.com
                </a>
              </p>
            </CardContent>
          </Card>
        )}

        {isFullscreenMap && mapboxToken ? (
          /* Fullscreen Map View */
          <div className="flex-1 relative">
            <div ref={mapContainer} className="w-full h-full" />
            {selectedOrder && (
              <Card className="absolute top-4 left-4 w-80 max-h-96 overflow-auto">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    Order Details
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(null)}
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{selectedOrder.id}</span>
                    <Badge 
                      style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                      className="text-white border-0"
                    >
                      {getStatusEmoji(selectedOrder.status)} {selectedOrder.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                    <p><strong>Provider Type:</strong> {selectedOrder.providerType}</p>
                    <p><strong>Meal Name:</strong> {selectedOrder.mealName}</p>
                    <p><strong>Delivery Time:</strong> {selectedOrder.time}</p>
                    <p><strong>Address:</strong> {selectedOrder.address}</p>
                    <p className="text-lg font-bold text-green-600">₹{selectedOrder.amount}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : mapboxToken ? (
          /* Side-by-Side View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
            {/* Calendar Section */}
            <div className="space-y-6">
              {renderCustomCalendar()}
              
              {/* Selected Date Orders */}
              {selectedDate && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      📅 {format(selectedDate, "MMMM dd, yyyy")}
                      <span className="text-sm font-normal text-muted-foreground">
                        ({selectedDateOrders.length} orders)
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDateOrders.length > 0 ? (
                      <div className="space-y-3">
                        {selectedDateOrders.map((order) => (
                          <div 
                            key={order.id} 
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              selectedOrder?.id === order.id ? 'border-primary bg-primary/5' : ''
                            } ${highlightedOrder?.id === order.id ? 'border-blue-500 bg-blue-50' : 'hover:border-primary/50'}`}
                            onClick={() => {
                              setSelectedOrder(order);
                              setHighlightedOrder(order);
                              // Fly to marker on map
                              if (map.current) {
                                map.current.flyTo({
                                  center: order.coordinates,
                                  zoom: 15,
                                  duration: 1000
                                });
                              }
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{order.id}</span>
                                <Badge variant={order.type === "Delivery" ? "default" : "secondary"}>
                                  {order.type === "Delivery" ? <Truck className="h-3 w-3 mr-1" /> : <Package className="h-3 w-3 mr-1" />}
                                  {order.type}
                                </Badge>
                                <Badge 
                                  style={{ backgroundColor: getStatusColor(order.status) }}
                                  className="text-white border-0"
                                >
                                  {getStatusEmoji(order.status)} {order.status}
                                </Badge>
                              </div>
                              <span className="text-sm font-medium">₹{order.amount}</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{order.customer}</p>
                              <p className="text-sm text-muted-foreground">{order.mealName} • {order.providerType}</p>
                              <p className="text-xs text-muted-foreground">{order.items} items • {order.time}</p>
                              <p className="text-xs text-muted-foreground">{order.address}</p>
                            </div>
                          </div>
                        ))}
                        <div className="pt-3 border-t">
                          <div className="grid grid-cols-2 gap-4">
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
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No orders scheduled for this date</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Map Section */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🗺️ Order Locations
                  <span className="text-sm font-normal text-muted-foreground">
                    ({selectedDateOrders.length} orders)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div ref={mapContainer} className="h-[600px] w-full rounded-b-lg" />
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Calendar Only View */
          <div className="space-y-6">
            {renderCustomCalendar()}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    📅 {format(selectedDate, "MMMM dd, yyyy")}
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
                              <Badge 
                                style={{ backgroundColor: getStatusColor(order.status) }}
                                className="text-white border-0"
                              >
                                {getStatusEmoji(order.status)} {order.status}
                              </Badge>
                            </div>
                            <span className="text-sm font-medium">₹{order.amount}</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">{order.mealName} • {order.providerType}</p>
                            <p className="text-xs text-muted-foreground">{order.items} items • {order.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No orders scheduled for this date</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}