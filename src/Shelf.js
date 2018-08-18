import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Shelf extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		title: PropTypes.string,
		filter: PropTypes.string
	}

	render() {
		const { books, title, filter } = this.props

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.filter( (book) => book.shelf === filter)
								.map( (book) => (
							<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
										<div className="book-shelf-changer">
											<select defaultValue={book.shelf}>
												<option value="move" disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{book.title}</div>
									<div className="book-authors">{book.authors.map( (a,index) => (<span key={index}>{a}<br/></span>) )}</div>
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Shelf