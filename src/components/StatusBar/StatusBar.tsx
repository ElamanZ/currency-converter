import { Clock, RefreshCw, Wifi, WifiOff } from "lucide-react";

import "./StatusBar.scss";

import { StatusBarProps } from "@/types/types";

const StatusBar = ({
  isOnline,
  lastUpdated,
  onRefresh,
  isLoading,
  isUsingCache,
}: StatusBarProps) => {
  return (
    <div className="status-bar">
      <div className="status-bar__content">
        <span className={`badge ${isOnline ? "badge--online" : "badge--offline"}`}>
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          {isOnline ? "Online" : "Offline"}
        </span>
        
        {lastUpdated && (
          <div className="status-bar__timestamp">
            <Clock size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
        
        <button 
          className="btn btn--refresh" 
          onClick={onRefresh} 
          disabled={isLoading}
        >
          <RefreshCw size={14} className={isLoading ? "spinning" : ""} />
          Refresh rates
        </button>
      </div>
      
      {isUsingCache && (
        <div className="status-bar__cache-notice">
          Using cached rates from {lastUpdated}
        </div>
      )}
    </div>
  );
};

export default StatusBar;
