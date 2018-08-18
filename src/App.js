import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import sortBy from 'sort-by'

class BooksApp extends React.Component {

  state = {
    books: [] /* list of all books */
  }

  /* load all books */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.sort(sortBy('title'))
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    //update server data
    BooksAPI.update(book, shelf).then( () => {
      //update local data - having a hard time getting my head around this immutability thing so ...
      //adaptation of https://stackoverflow.com/questions/29537299/react-how-do-i-update-state-item1-on-setstate-with-jsfiddle (mpen answer)
      // 1. Make a shallow copy of the books
      let booksCopy = [...this.state.books]
      // 2. Make a shallow copy of the book you want to mutate
      let index = booksCopy.findIndex( (b) => b.id === book.id )
      let bookCopy = {...booksCopy[ index ]}
      // 3. Replace the property you're intested in
      bookCopy.shelf = shelf
      // 4. Put it back into our array. 
      booksCopy[index] = bookCopy;
      // 5. Set the state to our new copy
      this.setState({books: booksCopy})
    })
  }

  render() {
    return (
      <div className="app">

        {/* main page route */}
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf books={this.state.books} onShelfChange={this.changeShelf} title="Currently Reading" filter="currentlyReading"/>
                <Shelf books={this.state.books} onShelfChange={this.changeShelf} title="Want To Read" filter="wantToRead"/>
                <Shelf books={this.state.books} onShelfChange={this.changeShelf} title="Read" filter="read"/>

                {/* temporarily display 'none' books if there are any ... */}
                { this.state.books.filter( (b) => b.shelf === 'none' ).length > 0 && (
                  <Shelf books={this.state.books} onShelfChange={this.changeShelf} title="Other" filter="none"/>
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to='./search'>Add a book</Link>
            </div>
          </div>
        )}/>

        {/* search page route */}
        <Route path='/search' render={() => (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="./">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
