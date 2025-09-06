import StatusBar from "@/components/StatusBar";
import "./ConverterPage.scss";

const ConverterPage = () => {
  const isOnline = true;
  const lastUpdated = "12:00 PM";
  return (
    <div className="container">
      <h1 className="title">Currency converter</h1>
      <p className="subtitle">Get real-time exchange rates</p>

      <StatusBar
        isOnline={isOnline}
        lastUpdated={lastUpdated}
        onRefresh={() => {}}
        loading={status === "loading"}
      />

      {!isOnline && lastUpdated && (
        <p className="subtitle">Using cached rates from {lastUpdated}</p>
      )}
    </div>
  );
};

export default ConverterPage;
