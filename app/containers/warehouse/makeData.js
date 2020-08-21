const range = len => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

const newPerson = id => {
  const statusChance = Math.random();
  return {
    id,
    firstName: `firstName ${Math.random() * 100}`,
    lastName: `LastName ${Math.random() * 100}`,
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : 'single',
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    // eslint-disable-next-line no-unused-vars
    return range(len).map(d => ({
      ...newPerson(d),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
    }));
  };

  return makeDataLevel();
}
