import './App.css';

import { useState, useCallback } from 'react';
import CustomizationDemoClasses from './000CustomizationDemoClasses';
import QuickStartGuide from './001QuickStartGuide';
import EnterpriseOverview from './002EnterpriseOverview';
import CustomisingCells from './003CustomisingCells';
import ReactRendering from './004ReactRendering';
import ReactFilters from './005ReactFilters';
import ReactCustomFilters from './006ReactCustomFilters';
import ReactCustomFloatingFilters from './007ReactCustomFloatingFilters';
import ReactComponents from './008ReactComponents';
import UpdatingRowData from './009UpdatingRowData';
import ReactColumns from './010ReactColumns';
import ReactColumnState from './011ReactColumnState';
import RowGrouping from './012RowGrouping';

function App() {
  const [sampleNum, setSampleNum] = useState(0);
  const handleChange = useCallback(e => {
    setSampleNum(Number(e.target.value));
  }, []);

  return (
    <div>
      <p>サンプル切り替え</p>
      <select value={sampleNum} onChange={e => handleChange(e)}>
        {[...Array(12)].map((_, i) => {
          return <option value={i}>{i}</option>;
        })}
      </select>
      <div className="ag-theme-alpine" style={{ width: '100%', height: 500 }}>
        {sampleNum === 0 && <CustomizationDemoClasses />}
        {sampleNum === 1 && <QuickStartGuide />}
        {sampleNum === 2 && <EnterpriseOverview />}
        {sampleNum === 3 && <CustomisingCells />}
        {sampleNum === 4 && <ReactRendering />}
        {sampleNum === 5 && <ReactFilters />}
        {sampleNum === 6 && <ReactCustomFilters />}
        {sampleNum === 7 && <ReactCustomFloatingFilters />}
        {sampleNum === 8 && <ReactComponents />}
        {sampleNum === 9 && <UpdatingRowData />}
        {sampleNum === 10 && <ReactColumns />}
        {sampleNum === 11 && <ReactColumnState />}
        {sampleNum === 12 && <RowGrouping />}
      </div>
    </div>
  );
}

export default App;
