import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageSquare,
  DollarSign,
  Home,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import api from '../../services/api';

interface AnalyticsData {
  properties: {
    total: number;
    approved: number;
    pending: number;
    premium: number;
  };
  views: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    trend: number;
  };
  inquiries: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    trend: number;
  };
  favorites: {
    total: number;
    thisMonth: number;
    trend: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    trend: number;
  };
  topProperties: Array<{
    id: string;
    title: string;
    views: number;
    inquiries: number;
  }>;
  recentActivity: Array<{
    type: string;
    message: string;
    time: string;
  }>;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel = 'vs last month',
  color
}) => {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              {isPositive && (
                <span className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +{trend.toFixed(1)}%
                </span>
              )}
              {isNegative && (
                <span className="flex items-center text-red-600 text-sm">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  {trend.toFixed(1)}%
                </span>
              )}
              {!isPositive && !isNegative && (
                <span className="text-gray-500 text-sm">0%</span>
              )}
              <span className="text-gray-400 text-xs ml-2">{trendLabel}</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Simple bar chart component
const SimpleBarChart: React.FC<{ data: { label: string; value: number }[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">{item.value.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-luxury-gold to-premium-orange rounded-full transition-all duration-500"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Circular progress component
const CircularProgress: React.FC<{ value: number; max: number; label: string; color: string }> = ({
  value,
  max,
  label,
  color
}) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">{value}</span>
        </div>
      </div>
      <span className="text-sm text-gray-600 mt-2">{label}</span>
    </div>
  );
};

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      // Fetch from multiple endpoints
      const [propertiesRes, inquiriesRes] = await Promise.all([
        api.get('/properties/stats/overview'),
        api.get('/inquiries/stats')
      ]);

      // Combine data (mock some data for demo)
      setAnalytics({
        properties: propertiesRes.data.data || {
          total: 45,
          approved: 38,
          pending: 5,
          premium: 12
        },
        views: {
          total: 15420,
          thisMonth: 3250,
          lastMonth: 2890,
          trend: 12.5
        },
        inquiries: {
          total: inquiriesRes.data.total || 284,
          thisMonth: 45,
          lastMonth: 38,
          trend: 18.4
        },
        favorites: {
          total: 856,
          thisMonth: 124,
          trend: 8.2
        },
        revenue: {
          total: 125000000,
          thisMonth: 28500000,
          lastMonth: 22000000,
          trend: 29.5
        },
        topProperties: [
          { id: '1', title: '5 Bedroom Mansion in Banana Island', views: 1250, inquiries: 28 },
          { id: '2', title: 'Luxury Apartment in Lekki Phase 1', views: 980, inquiries: 22 },
          { id: '3', title: 'Modern Villa in Ikoyi', views: 856, inquiries: 18 },
          { id: '4', title: 'Penthouse in Victoria Island', views: 720, inquiries: 15 },
          { id: '5', title: 'Smart Home in Ikeja GRA', views: 650, inquiries: 12 }
        ],
        recentActivity: [
          { type: 'inquiry', message: 'New inquiry for Lekki apartment', time: '5 mins ago' },
          { type: 'view', message: 'Property viewed 50 times today', time: '1 hour ago' },
          { type: 'favorite', message: '12 new favorites this week', time: '2 hours ago' },
          { type: 'approval', message: 'Property approved by admin', time: '3 hours ago' }
        ]
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Set demo data on error
      setAnalytics({
        properties: { total: 45, approved: 38, pending: 5, premium: 12 },
        views: { total: 15420, thisMonth: 3250, lastMonth: 2890, trend: 12.5 },
        inquiries: { total: 284, thisMonth: 45, lastMonth: 38, trend: 18.4 },
        favorites: { total: 856, thisMonth: 124, trend: 8.2 },
        revenue: { total: 125000000, thisMonth: 28500000, lastMonth: 22000000, trend: 29.5 },
        topProperties: [],
        recentActivity: []
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `₦${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `₦${(amount / 1000).toFixed(1)}K`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-luxury-gold text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Properties"
          value={analytics.properties.total}
          icon={<Home className="w-6 h-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <StatCard
          title="Total Views"
          value={analytics.views.total.toLocaleString()}
          icon={<Eye className="w-6 h-6 text-purple-600" />}
          trend={analytics.views.trend}
          color="bg-purple-100"
        />
        <StatCard
          title="Inquiries"
          value={analytics.inquiries.total}
          icon={<MessageSquare className="w-6 h-6 text-green-600" />}
          trend={analytics.inquiries.trend}
          color="bg-green-100"
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(analytics.revenue.thisMonth)}
          icon={<DollarSign className="w-6 h-6 text-amber-600" />}
          trend={analytics.revenue.trend}
          color="bg-amber-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Status */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Property Status</h3>
          <div className="flex justify-around">
            <CircularProgress
              value={analytics.properties.approved}
              max={analytics.properties.total}
              label="Approved"
              color="#22c55e"
            />
            <CircularProgress
              value={analytics.properties.pending}
              max={analytics.properties.total}
              label="Pending"
              color="#f59e0b"
            />
            <CircularProgress
              value={analytics.properties.premium}
              max={analytics.properties.total}
              label="Premium"
              color="#D4AF37"
            />
          </div>
        </div>

        {/* Top Properties */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Top Properties by Views</h3>
          <SimpleBarChart
            data={analytics.topProperties.map(p => ({
              label: p.title.length > 30 ? p.title.substring(0, 30) + '...' : p.title,
              value: p.views
            }))}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {analytics.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full ${
                activity.type === 'inquiry' ? 'bg-green-100 text-green-600' :
                activity.type === 'view' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'favorite' ? 'bg-red-100 text-red-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                {activity.type === 'inquiry' && <MessageSquare className="w-4 h-4" />}
                {activity.type === 'view' && <Eye className="w-4 h-4" />}
                {activity.type === 'favorite' && <Heart className="w-4 h-4" />}
                {activity.type === 'approval' && <Home className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
