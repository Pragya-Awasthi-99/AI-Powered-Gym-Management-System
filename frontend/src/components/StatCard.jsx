const StatCard = ({ title, value }) => {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold text-purple-600 mt-2">{value}</p>
      </div>
    );
  };
  
  export default StatCard;
  