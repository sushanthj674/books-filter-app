import { Component } from "react";

const books = [
  { title: "1984", author: "George Orwell", year: "1949" },
  { title: "Anna Karenina", author: "Leo Tolstoy", year: "1877" },
  { title: "Brave New World", author: "Aldous Huxley", year: "1932" },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: "1866" },
  { title: "Don Quixote", author: "Miguel de Cervantes", year: "1605" },
  { title: "Dracula", author: "Bram Stoker", year: "1897" },
  { title: "Frankenstein", author: "Mary Shelley", year: "1818" },
  { title: "Great Expectations", author: "Charles Dickens", year: "1860" },
  { title: "Jane Eyre", author: "Charlotte Brontë", year: "1847" },
  { title: "Les Misérables", author: "Victor Hugo", year: "1862" },
  { title: "Moby-Dick", author: "Herman Melville", year: "1851" },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    year: "1967",
  },
  { title: "Pride and Prejudice", author: "Jane Austen", year: "1813" },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    year: "1880",
  },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", year: "1951" },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    year: "1844",
  },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: "1925" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", year: "1937" },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: "1954" },
  { title: "The Odyssey", author: "Homer", year: "-800" },
  { title: "The Picture of Dorian Gray", author: "Oscar Wilde", year: "1890" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: "1960" },
  { title: "War and Peace", author: "Leo Tolstoy", year: "1869" },
  { title: "Wuthering Heights", author: "Emily Brontë", year: "1847" },
];

class BookRow extends Component {
  render() {
    const { title, author, year } = this.props.book;
    return (
      <tr>
        <td>{title}</td>
        <td>{author}</td>
        <td>{year}</td>
      </tr>
    );
  }
}

class Input extends Component {
  render() {
    const { value, onChange, placeholder } = this.props;
    return (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedField: "title",
      inputValue: "",
    };
  }

  handleSelectChange = (event) => {
    const selectedField = event.target.value;
    this.setState({ selectedField, inputValue: "" }, () => {
      this.props.onFilter(selectedField, "");
    });
  };

  handleInputChange = (value) => {
    const { selectedField } = this.state;
    this.setState({ inputValue: value });
    this.props.onFilter(selectedField, value);
  };

  render() {
    const { selectedField, inputValue } = this.state;
    const { options } = this.props;

    return (
      <>
        <Input
          value={inputValue}
          onChange={this.handleInputChange}
          placeholder={`Search by ${selectedField}`}
        />
        <select value={selectedField} onChange={this.handleSelectChange}>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </>
    );
  }
}

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: books,
      filteredBooks: [...books],
      sortField: "title",
      sortOrder: "asc",
    };
  }

  handleFilter = (field, value) => {
    const filteredBooks = this.state.allBooks.filter((book) =>
      book[field].toLowerCase().startsWith(value.toLowerCase())
    );
    this.setState({ filteredBooks });
  };

  handleSort = (field) => {
    const { sortField, sortOrder, filteredBooks } = this.state;
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";

    const sortedBooks = [...filteredBooks].sort((a, b) => {
      if (field === "year") {
        return newOrder === "asc"
          ? parseInt(a[field]) - parseInt(b[field])
          : parseInt(b[field]) - parseInt(a[field]);
      } else {
        return newOrder === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });

    this.setState({
      filteredBooks: sortedBooks,
      sortField: field,
      sortOrder: newOrder,
    });
  };

  render() {
    const { filteredBooks, sortField, sortOrder } = this.state;
    const fields = ["title", "author", "year"];

    return (
      <>
        <Search options={fields} onFilter={this.handleFilter} />
        <table>
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field} onClick={() => this.handleSort(field)}>
                  {field}
                  {sortField === field
                    ? sortOrder === "asc"
                      ? " ▲"
                      : " ▼"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, idx) => (
              <BookRow key={idx} book={book} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

class App extends Component {
  render() {
    return <Books />;
  }
}

export default App;
