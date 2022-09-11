import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// import 'ag-grid-enterprise'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

const QuickStartGuide = () => {
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData));
  }, []);

  const buttonListener = useCallback(e => {
    console.log(gridRef.current);
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      <p>QuickStartGuide</p>
      <button onClick={buttonListener}>Push Me</button>
      <div className="ag-theme-alpine" style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default QuickStartGuide;
