import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'

class Search extends Component {
	static propTypes = {
		onShelfChange: PropTypes.func.isRequired,
		appBooks: PropTypes.array.isRequired
	}

	state = {
		query: '',
		books: []
	}

	componentDidMount() {
		this.setState({ books: [] })
	}

	/* updates books on search page based on query */
	/* sets shelf for displayed books */
	search(query) {
		if(query) {
			BooksAPI.search(query).then( (apiBooks) => {
				this.setState({
					query: query, 
					books: ('error' in apiBooks) ? [] : apiBooks.map( (book) => {
								let index = this.props.appBooks.findIndex( (b) => b.id === book.id) /* search book on shelfs */
								book.shelf = (index > -1) ? this.props.appBooks[index].shelf : 'none' /* sets shelf */
								return book
							 }).sort(sortBy('title'))
				})
			})
		} else {
			this.setState({ query: '', books: [] })
		}
	}

	render () {
		const { onShelfChange } = this.props
		const { query, books } = this.state

		return (
			<div className="search-books">
				<div className="search-books-bar">
						<Link className="close-search" to="./">Close</Link>
						<div className="search-books-input-wrapper">
						<input 
							type="text"
							placeholder="Search by title or author"
							value={query}
							onChange={(event) => this.search(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books.map( (b) => {
							return <Book book={b} onShelfChange={onShelfChange} key={b.id}/>
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default Search