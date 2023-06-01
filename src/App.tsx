import { useState } from 'react';
import { Select, SelectOption } from './Select';

const options: SelectOption[] = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 4 },
  { label: 'Fith', value: 5 },
];

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);
  const [valueArr, setValueArr] = useState<SelectOption[]>([options[0]]);

  return (
    <div style={{ display: 'flex', gap: '10px', alignSelf: 'start' }}>
      <Select
        options={options}
        value={value}
        onChange={(opt) => setValue(opt)}
      />
      <Select
        multiple
        options={options}
        value={valueArr}
        onChange={(arr) => setValueArr(arr)}
      />
    </div>
  );
}

export default App;
