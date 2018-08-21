import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

	static propTypes = {
		book: PropTypes.object.isRequired,
		onShelfChange: PropTypes.func.isRequired
	}

	/* changes control color by shelf */
	color(shelf) {
		if( shelf === 'currentlyReading' ) 	{ return '#f66' }
		if( shelf === 'wantToRead' ) 			{ return '#66f' }
		if( shelf === 'read' ) 					{ return '#6a5' }
		if( shelf === 'none' ) 					{ return '#666' }
	}

	render () {
		const { book, onShelfChange } = this.props

		let thumb = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/128x193?text=No+image' /* fix missing thumb */
		let auth = book.authors ? book.authors : [] /* fix missing authors */
		return <li>
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${thumb})`}}></div>
					<div className="book-shelf-changer" style={{backgroundColor: this.color(book.shelf)}}>
						<select onChange={e => onShelfChange(book, e.target.value)} defaultValue={book.shelf}>
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
	}
}

export default Book