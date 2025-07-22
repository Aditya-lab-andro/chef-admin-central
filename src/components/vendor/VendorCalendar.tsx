import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarDays, Package, Truck, Map, MapPin, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
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
  const [filterType, setFilterType] = useState<string>("all");
  const [showMap, setShowMap] = useState(true);
  const [mapboxToken, setMapboxToken] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<CalendarOrder | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Preparing": return "#f59e0b";
      case "Ready": return "#10b981";
      case "Picked Up": return "#3b82f6";
      case "Delivered": return "#059669";
      case "Cancelled": return "#ef4444";
      default: return "#6b7280";
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || !showMap) return;

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
  }, [mapboxToken, showMap]);

  // Add markers when orders change
  useEffect(() => {
    if (!map.current || !selectedDateOrders.length) return;

    // Clear existing markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());

    selectedDateOrders.forEach((order) => {
      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'relative cursor-pointer';
      markerEl.innerHTML = `
        <div class="relative">
          <div class="w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-primary">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-semibold text-white rounded whitespace-nowrap" 
               style="background-color: ${getStatusColor(order.status)}">
            ${order.status}
          </div>
        </div>
      `;

      // Create popup content
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3 min-w-[200px]">
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-lg">${order.id}</span>
            <span class="px-2 py-1 text-xs rounded text-white" style="background-color: ${getStatusColor(order.status)}">
              ${order.status}
            </span>
          </div>
          <div class="space-y-1 text-sm">
            <p><strong>Customer:</strong> ${order.customer}</p>
            <p><strong>Provider:</strong> ${order.providerType}</p>
            <p><strong>Meal:</strong> ${order.mealName}</p>
            <p><strong>Delivery Time:</strong> ${order.time}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p class="text-lg font-bold text-green-600">₹${order.amount}</p>
          </div>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(markerEl)
        .setLngLat(order.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      // Handle marker click
      markerEl.addEventListener('click', () => {
        setSelectedOrder(order);
      });
    });
  }, [selectedDateOrders]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order Calendar & Map</h1>
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMap(!showMap)}
            className="md:hidden"
          >
            {showMap ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showMap ? "Hide" : "Show"} Map
          </Button>
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

      <div className={`grid gap-6 ${showMap && mapboxToken ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
        {/* Calendar Section */}
        <div className={showMap && mapboxToken ? 'xl:col-span-1' : 'lg:col-span-2'}>
          <Card>
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
        </div>

        {/* Map Section */}
        {showMap && mapboxToken && (
          <div className="xl:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Order Locations
                  <span className="text-sm font-normal text-muted-foreground">
                    ({selectedDateOrders.length} orders)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div ref={mapContainer} className="h-[500px] w-full rounded-b-lg" />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Order Details Section */}
        <div className={showMap && mapboxToken ? 'xl:col-span-2' : ''}>
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
                    <div 
                      key={order.id} 
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedOrder?.id === order.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedOrder(order)}
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
                            {order.status}
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
        </div>
      </div>
    </div>
  );
}