/* global window, document */
if (! window._babelPolyfill) {
  require('babel-polyfill');
}

import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './containers/Admin.jsx';
import HomeOptions from './containers/HomeOptions.jsx';
import Search from './containers/Search.jsx';
import ContactList from './containers/ContactList.jsx';

let contacts = [
	{
		id: 1,
		name: 'Hever',
		phone: '5555-5555'
	},
	{
		id: 2,
		name: 'Uziel',
		phone: '5555-1234'
	},
	{
		id: 3,
		name: 'Manuel',
		phone: '5555-2341'
	},
	{
		id: 4,
		name: 'Pablo',
		phone: '5555-3412'
	}
];

document.addEventListener('DOMContentLoaded', function() {
  // ReactDOM.render(<Admin wpObject={window.wpr_object} />, document.getElementById('wp-reactivate-admin'));
  // ReactDOM.render(<HomeOptions wpObject={window.wpr_object}/>, document.getElementById('wp-reactivate-admin'));
  // ReactDOM.render(<Search contacts={contacts} />,document.getElementById('wp-reactivate-admin'));
  ReactDOM.render(
  	<ContactList contacts={contacts} />, document.getElementById('wp-reactivate-admin')
  	);
});
