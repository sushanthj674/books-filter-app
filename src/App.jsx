import { Component } from "react";

class Table extends Component {
  render() {
    const { headers, tData } = this.props;

    return (
      <table border={1}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{rowData[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

class Input extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <input
        placeholder="Type to filter..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
}

class Select extends Component {
  render() {
    const { options, value, onChange } = this.props;
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}

const books = [
  { title: "Great Expectations", author: "Charles Dickens", year: 1860 },
  { title: "War and Peace", author: "Leo Tolstoy", year: 1869 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
  { title: "1984", author: "George Orwell", year: 1949 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", year: 1967 },
  { title: "Brave New World", author: "Aldous Huxley", year: 1932 },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
  { title: "Moby-Dick", author: "Herman Melville", year: 1851 },
  { title: "Jane Eyre", author: "Charlotte Brontë", year: 1847 },
  { title: "Wuthering Heights", author: "Emily Brontë", year: 1847 },
  { title: "Don Quixote", author: "Miguel de Cervantes", year: 1605 },
  { title: "The Odyssey", author: "Homer", year: "800 BCE" },
  { title: "Anna Karenina", author: "Leo Tolstoy", year: 1877 },
  { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", year: 1880 },
  { title: "The Picture of Dorian Gray", author: "Oscar Wilde", year: 1890 },
  { title: "Frankenstein", author: "Mary Shelley", year: 1818 },
  { title: "Dracula", author: "Bram Stoker", year: 1897 },
  { title: "The Count of Monte Cristo", author: "Alexandre Dumas", year: 1844 },
  { title: "Les Misérables", author: "Victor Hugo", year: 1862 },
];

class App extends Component {
  constructor(props) {
    super(props);
    const headers = Object.keys(books[0]);
    this.state = {
      books,
      filteredBooks: books,
      headers,
      filterBy: headers[0],
      searchTerm: "",
    };
  }

  handleSearch = (value) => {
    const { filterBy } = this.state;
    const filteredBooks = books.filter((book) =>
      book[filterBy].toString().toLowerCase().startsWith(value.toLowerCase())
    );
    this.setState({ searchTerm: value, filteredBooks });
  };

  handleSelect = (selectedField) => {
    this.setState({
      filterBy: selectedField,
      searchTerm: "",
      filteredBooks: books,
    });
  };

  render() {
    const { headers, filteredBooks, searchTerm, filterBy } = this.state;

    return (
      <>
        <Input value={searchTerm} onChange={this.handleSearch} />
        <Select
          options={headers}
          value={filterBy}
          onChange={this.handleSelect}
        />
        <Table headers={headers} tData={filteredBooks} />
      </>
    );
  }
}

export default App;
