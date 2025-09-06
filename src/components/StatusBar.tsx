import { Clock, RefreshCw, Wifi, WifiOff } from "lucide-react";

type Props = {
  isOnline: boolean;
  lastUpdated: string;
  onRefresh: () => void;
  loading: boolean;
  offlineNote?: string | null;
};

const StatusBar = ({
  isOnline,
  lastUpdated,
  onRefresh,
  loading,
  offlineNote,
}: Props) => {
  return (
    <div>
      <div className="status">
        <span className={`badge ${isOnline ? "badge--ok" : "badge--off"}`}>
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}{" "}
          {isOnline ? "Online" : "Offline"}
        </span>
        <span
          className="subtitle"
          style={{ margin: 0, fontSize: 12, display: "flex", gap: 6 }}
        >
          <Clock size={14} />
          Last updated: {lastUpdated}
        </span>
        <button className="btn" onClick={onRefresh} disabled={loading}>
          <RefreshCw size={14} /> Refresh rates
        </button>
      </div>
      {!isOnline && offlineNote && <p className="subtitle">{offlineNote}</p>}
    </div>
  );
};

export default StatusBar;
