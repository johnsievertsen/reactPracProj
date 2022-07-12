import * as React from 'react';

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
    {
      title: 'ß',
      url: 'https://en.wikipedia.org/wiki/%C3%9F',
      author: 'I made this up ngl',
      num_comments: 444,
      points: 7,
      objectID: 2,
    },
  ];

  const [searchTerm, setSearchTerm] = useStorageState('search', 'ß');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Search Frameworks</h1>

      <InputWithLabel id='search' label='Search' onInputChange={handleSearch} value={searchTerm} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
}

const InputWithLabel = ({ id, label, value, onInputChange }) => (
  <>
    <label htmlFor={id}>{label}</label>
    &nbsp;&nbsp;
    <input id={id} type='text' value={value} onChange={onInputChange} />

    <p>
      Searching for <strong>{value}</strong>
    </p>
  </>
);

const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

export default App;