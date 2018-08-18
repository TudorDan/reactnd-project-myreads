import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'

class BooksApp extends React.Component {

  state = {
    books: [] /* list of all books */
  }

  /* load all books */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
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
                <Shelf books={this.state.books} title="Currently Reading" filter="currentlyReading"/>
                <Shelf books={this.state.books} title="Want To Read" filter="wantToRead"/>
                <Shelf books={this.state.books} title="Read" filter="read"/>
                <Shelf books={this.state.books} title="Other" filter="none"/>
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
