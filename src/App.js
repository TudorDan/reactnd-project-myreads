import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'
import sortBy from 'sort-by'

class BooksApp extends React.Component {

  state = {
    books: [] /* list of all books */
  }

  /* loads & sorts shelfed books from server */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.sort(sortBy('title'))
      this.setState({ books })
    })
  }

  /* changes shelf of book in state & server data */
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then( () => {
      book.shelf = shelf;
      this.setState({ books: [...this.state.books.filter(b => b.id !== book.id), book].sort(sortBy('title')) })
    })
  }

  render() {
    return (
      <div className="app">

        <Switch>

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
            <Search onShelfChange={this.changeShelf} appBooks={this.state.books}/>
          )}/>

          {/* 404 page route */}
          <Route render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div className='p404'>
                  <p>This is not the page you're looking for ...</p>
                  <p><img src="https://media.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif" alt="Jedi hand wave"/></p>
                  <p>You look for <Link to='./search'>the search page</Link> or for <Link to='./'>the shelfs</Link>.</p>
                </div>
              </div>
            </div>
          )}/>

        </Switch>
        
      </div>
    )
  }
}

export default BooksApp
