import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Component,
} from 'react';

const PushComp = p => {
  const onAt = useCallback(() => {
    console.log(p);
    window.alert('Push');
  }, [p]);
  return (
    <>
      {/* 関数などの挙動を付与できる */}
      <button onClick={onAt}>Push</button>
      {/* p.value: セルの行データの値 p.value: 行の各セルの生データ*/}
      {p.value}
      {p.test}
    </>
  );
};

class PullComp extends Component {
  render() {
    return (
      <>
        <button onClick={() => window.alert('Pull')}>Pull</button>
        {this.props.value}
      </>
    );
  }
}

const CustomisingCells = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    // cellRendererでcellのカスタマイズコンポーネントを指定できる
    { field: 'athlete', cellRenderer: PushComp },
    {
      field: 'age',
      cellRenderer: p => (
        <>
          <b>Age is: </b>
          {p.value}
        </>
      ),
    },
    { field: 'country', cellRenderer: PullComp },
    {
      field: 'year',
      cellRendererSelector: p => {
        // コンポーネントのレンダリングをデータに依存させたい場合は、セルレンダラーセレクタを使用することで実現できる
        if (p.value == 2000) {
          // paramsでcell comp内のp.hogeでアクセスできるようになる
          return { component: PushComp, params: { test: 'aaa' } };
        }
        if (p.value == 2004) {
          return { component: PullComp };
        }
      },
    },
    // デフォルトでのcellRendererを打ち消せる
    { field: 'date', cellRenderer: null },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      // cellRenderer: SimpleComp // これで常にカスタムセルを使用できる
    }),
    []
  );

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: '100%', height: 500 }}>
      <p>CustomisingCells</p>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        animateRows={true}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default CustomisingCells;
