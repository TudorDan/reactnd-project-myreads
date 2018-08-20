import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		onShelfChange: PropTypes.func.isRequired,
		title: PropTypes.string,
		filter: PropTypes.string
	}

	render() {
		const { books, onShelfChange, title, filter } = this.props

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				{filter === 'none' && (
					<p>These won't be shown here after refresh but you may find them again using the search page ...</p>
				)}
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.filter( (book) => book.shelf === filter)
								.map( (b) => {
									return <Book book={b} onShelfChange={onShelfChange} key={b.id}/>
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default Shelf