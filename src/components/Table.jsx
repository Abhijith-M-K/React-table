import React, { useState, useEffect } from "react";
import names from "../data.json";
function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setData(names);
    };
    fetchData();
  }, []);

  const duplicateCounts = {};
  data.forEach(({ name }) => {
    if (!duplicateCounts[name]) {
      duplicateCounts[name] = 1;
    } else {
      duplicateCounts[name]++;
    }
  });

  const distinctData = Object.entries(duplicateCounts).map(([name, count]) => ({
    name,
    count,
  }));

  const sortedData = [...distinctData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const getRowStyles = (count) => {
    if (count > 0 && count < 3) {
      return { backgroundColor: "red" };
    } else if (count >= 3 && count < 10) {
      return { backgroundColor: "yellow" };
    } else if (count >= 10) {
      return { backgroundColor: "green" };
    } else {
      return {};
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Duplicate Count</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(({ name, count }) => (
          <tr key={name} style={getRowStyles(count)}>
            <td>{name}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;
