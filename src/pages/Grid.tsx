/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useCallback, useMemo } from 'react';

/** utils */
import Colors from '../utils/colors';

export interface GridProps {}

const Grid: React.FC<GridProps> = () => {
  const [searchTxt, setSearchTxt] = useState<string>('');
  // 정렬 설정 (기본컬럼 : name)
  const [renderState, setRenderState] = useState<dataManager>({
    orderBy: 0,
    orderDirection: 'asc',
  });
  /** 정렬(sort) 연산을 하기 위한 결과값 반환 */
  const getValue = (rowData: any[string | number], columnDef: HeaderColumn) => {
    let value =
      columnDef.dataKey && typeof rowData[columnDef.dataKey] !== 'undefined'
        ? rowData[columnDef.dataKey]
        : '';
    return value;
  };
  /** 정렬 연산 이벤트 반환값(-1 => DESC, 1 => ASC) */
  const sort = <K extends number>(a: any, b: K, type?: { [x: number]: string }): number => {
    if (type === 'numeric') {
      return a - b;
    } else {
      if (a !== b) {
        if (!a) return -1;
        if (!b) return 1;
      }
    }
    return a < b ? -1 : a > b ? 1 : 0;
  };

  const handleSearchChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => setSearchTxt(value),
    [],
  );

  /** Header columns renderer */
  const headerRenderer = useMemo((): React.ReactNode => {
    /** order 변경 from column */
    const onChangeOrder = (orderBy: number, orderDirection: typeof renderState.orderDirection) => {
      const newOrderBy = orderDirection === '' ? -1 : orderBy;

      setRenderState({ orderBy: newOrderBy, orderDirection });
    };

    const node: React.ReactNode = headerColumns.map((column, idx) => {
      const { index, label, dataKey, sortable } = column;
      const { orderBy, orderDirection } = renderState;

      if (sortable) {
        let directionContent: React.ReactNode = (
          <svg
            width="1em"
            height="1em"
            style={{ transform: 'rotate(360deg)' }}
            viewBox="0 0 448 512"
            className="arrow-up opacity-hide"
          >
            <path
              d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
              fill="#333"
            />
          </svg>
        );

        if (orderBy === index) {
          directionContent =
            orderDirection === '' ? (
              <svg
                width="1em"
                height="1em"
                style={{ transform: 'rotate(360deg)' }}
                viewBox="0 0 448 512"
                className="arrow-up opacity-hide"
              >
                <path
                  d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                  fill="#333"
                />
              </svg>
            ) : orderDirection === 'asc' ? (
              <svg
                width="1em"
                height="1em"
                style={{ transform: 'rotate(360deg)' }}
                viewBox="0 0 448 512"
                className="arrow-up"
              >
                <path
                  d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                  fill="#333"
                />
              </svg>
            ) : orderDirection === 'desc' ? (
              <svg
                width="1em"
                height="1em"
                style={{ transform: 'rotate(360deg)' }}
                viewBox="0 0 448 512"
                className="arrow-down"
              >
                <path
                  d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
                  fill="#333"
                />
              </svg>
            ) : null;
        }

        return (
          <div
            key={`header-${idx}`}
            className="header"
            onClick={() => {
              const changeOrderDirection =
                index !== orderBy
                  ? 'asc'
                  : orderDirection === 'asc'
                  ? 'desc'
                  : orderDirection === 'desc'
                  ? ''
                  : orderDirection === ''
                  ? 'asc'
                  : 'desc';

              onChangeOrder(index, changeOrderDirection);
            }}
          >
            <div key={dataKey}>
              {label}
              {directionContent}
            </div>
          </div>
        );
      } else {
        return (
          <div key={`header-${idx}`} className="header">
            <div key={dataKey}>{label}</div>
          </div>
        );
      }
    });

    return <div css={GridHeader}>{node}</div>;
  }, [renderState]);

  /** Body cell renderer */
  const cellRenderer = useMemo((): React.ReactNode => {
    const { orderBy, orderDirection } = renderState;
    const columnDef: HeaderColumn =
      orderBy !== -1
        ? headerColumns.find((col) => col.index === orderBy)!
        : headerColumns.find((col) => col.index === 0)!;

    const sortDataCollect = dataCollect
      .sort(
        orderDirection === 'desc'
          ? (a, b) => sort(getValue(b, columnDef), getValue(a, columnDef), columnDef.type)
          : (a, b) => sort(getValue(a, columnDef), getValue(b, columnDef), columnDef.type),
      )
      .filter(
        (data) =>
          data.name.match(searchTxt) || data.age.match(searchTxt) || data.weight.match(searchTxt),
      );

    const node = sortDataCollect.map((data) => (
      <div key={`cell-${data.id}`}>
        <div key={`cell-name-${data.id}`} className="cell">
          {data.name}
        </div>
        <div key={`cell-age-${data.id}`} className="cell">
          {data.age}
        </div>
        <div key={`cell-weight-${data.id}`} className="cell">
          {data.weight}
        </div>
      </div>
    ));
    return <div css={GridCell}>{node}</div>;
  }, [searchTxt, renderState]);

  return (
    <div css={GridWrapper}>
      <h2>Grid</h2>
      <div css={SearchContainer}>
        <input
          type="text"
          name="searchTxt"
          id="searchTxt"
          className="searchTxt"
          placeholder="Please enter keywords"
          value={searchTxt}
          onChange={handleSearchChange}
        />
      </div>
      <div css={GridContainer}>
        {headerColumns.length > 0 && headerRenderer}
        {dataCollect.length > 0 && cellRenderer}
      </div>
    </div>
  );
};

/** styles */
const GridWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
`;

const SearchContainer = css`
  margin: 1rem 0;
  width: 100%;
  .searchTxt {
    outline: none;
    width: 15rem;
    height: 2rem;
  }
`;

const GridContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const GridHeader = css`
  width: 100%;
  display: flex;

  > .header {
    margin: 0 0.125rem;
    padding: 0.5rem 1rem;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${Colors.default.accent6};
    color: white;
    font-weight: bold;

    > div {
      display: flex;
      align-items: center;

      > svg {
        color: white;
        margin-left: 4px;
        margin-right: 4px;
        user-select: none;

        &.opacity-hide {
          opacity: 0;
          transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }

        > path {
          fill: white;
        }
      }
    }

    &:hover {
      opacity: 0.6;

      > div > svg.opacity-hide {
        opacity: 0.6;
      }
    }
  }
`;

const GridCell = css`
  width: 100%;
  display: flex;
  flex-direction: column;

  > div {
    display: flex;

    > .cell {
      margin: 0.0625rem 0.125rem;
      padding: 0.5rem 1rem;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${Colors.default.accent3};
    }
  }
`;

/** types */
type LiteralUnion<T extends U, U> = T | (U & {});
type HeaderColumn = {
  index: number;
  dataKey: string;
  label: number | string;
  editable?: boolean;
  sortable?: boolean;
  type?: LiteralUnion<'numeric' | 'button' | 'select' | 'date' | 'datetime' | 'percentage', string>;
};
type dataManager = {
  orderBy: number;
  orderDirection: 'asc' | 'desc' | '';
};
type DataCollect = {
  [key: string]: unknown;
  id: number | string;
  name: string;
  age: string;
  weight: string;
  isEdit?: boolean;
};

/** definition */
const headerColumns: HeaderColumn[] = [
  {
    index: 0,
    label: 'name',
    dataKey: 'name',
    sortable: true,
  },
  {
    index: 1,
    label: 'age',
    dataKey: 'age',
    sortable: true,
  },
  {
    index: 2,
    label: 'weight',
    dataKey: 'weight',
    sortable: true,
  },
];
const dataCollect: DataCollect[] = [
  {
    id: 0,
    name: 'Jack',
    age: '20',
    weight: '70',
  },
  {
    id: 1,
    name: 'Lee',
    age: '30',
    weight: '88',
  },
  {
    id: 2,
    name: 'Chuck',
    age: '17',
    weight: '75',
  },
  {
    id: 3,
    name: 'Ralph',
    age: '41',
    weight: '69',
  },
  {
    id: 4,
    name: 'Mark',
    age: '25',
    weight: '80',
  },
];

export default Grid;
