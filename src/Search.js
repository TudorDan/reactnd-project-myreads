import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Search extends Component {
	static propTypes = {
		onShelfChange: PropTypes.func.isRequired
	}

	state = {
		query: '',
		books: []
	}

	componentDidMount() {
		this.setState({ books: [] })
	}

	search(query) {
		if(query) {
			BooksAPI.search(query).then( (books) => {
				this.setState({
					query: query, 
					books: ('error' in books) ? [] : books
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
						{books.map( (book) => {
							let thumb = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/128x193?text=No+image'
							let auth = book.authors ? book.authors : []
							return <li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${thumb})`}}></div>
										<div className="book-shelf-changer">
											<select onChange={e => onShelfChange(book, e.target.value)} value={book.shelf}>
												<option value="move" disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{book.title}</div>
									<div className="book-authors">{auth.map( (a,index) => (<span key={index}>{a}<br/></span>) )}</div>
								</div>
							</li>
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default Search