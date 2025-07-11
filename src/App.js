import React, { useState } from 'react';
import './App.css';

// Simple area data - customize this for your actual workplace layout
const initialAreas = [
  { id: 1, name: 'Conference Room A', x: 50, y: 50, width: 150, height: 100 },
  { id: 2, name: 'Open Office', x: 250, y: 50, width: 200, height: 150 },
  { id: 3, name: 'Break Room', x: 50, y: 200, width: 100, height: 80 },
  { id: 4, name: 'Server Room', x: 350, y: 250, width: 100, height: 80 },
];

function App() {
  const [commissionedAreas, setCommissionedAreas] = useState(new Set());

  const toggleArea = (areaId) => {
    const newCommissioned = new Set(commissionedAreas);
    if (newCommissioned.has(areaId)) {
      newCommissioned.delete(areaId);
    } else {
      newCommissioned.add(areaId);
    }
    setCommissionedAreas(newCommissioned);
  };

  return (
    <div className="App">
      <h1>Lonsdale Workplace Commissioning Map</h1>
      <p>Click areas to toggle commissioning status</p>
      
      <div className="map-container">
        <svg width="500" height="400" className="workplace-map">
          {initialAreas.map(area => (
            <g key={area.id}>
              <rect
                x={area.x}
                y={area.y}
                width={area.width}
                height={area.height}
                fill={commissionedAreas.has(area.id) ? '#ff6b6b' : '#51cf66'}
                stroke="#333"
                strokeWidth="2"
                onClick={() => toggleArea(area.id)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={area.x + area.width / 2}
                y={area.y + area.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#333"
                fontSize="14"
                fontWeight="bold"
                pointerEvents="none"
              >
                {area.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color commissioned"></div>
          <span>Under Commissioning</span>
        </div>
      </div>
      
      <div className="area-status">
        <h3>Current Status</h3>
        {initialAreas.map(area => (
          <div key={area.id} className="status-item">
            <span className={commissionedAreas.has(area.id) ? 'commissioned' : 'available'}>
              {area.name}: {commissionedAreas.has(area.id) ? 'Under Commissioning' : 'Available'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
