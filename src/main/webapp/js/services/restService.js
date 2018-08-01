(function() {
	'use strict';

	angular.module('mainApp').factory('restService', [ '$q', '$http', 'constants', '$cookies', restService ]);

	function restService($q, $http, constants, $cookies) {
		return {
			getBooksWithSearch: getBooksWithSearch,
			createBook: createBook,
			deleteBookById: deleteBookById,
			updateBook: updateBook,
			getPupilsWithSearch: getPupilsWithSearch,
			getActiveBooks: getActiveBooks,
			giveBookToPupil: giveBookToPupil,
			getPupilBooks: getPupilBooks,
			returnBook: returnBook,
			createPupil: createPupil,
			deletePupilById: deletePupilById,
			updatePupil: updatePupil,
			getUsers: getUsers,
			updateUser: updateUser,
			deleteUser: deleteUser,
			createUser: createUser
		};

		function getUsers() {
			return $http.get('http://localhost:8082/api/v.1.0/user')
		}

		function deleteUser(id) {
			return $http.delete('http://localhost:8082/api/v.1.0/user/' + id);
		}

		function createUser(data) {
			return $http.post('http://localhost:8082/api/v.1.0/user', data);
		}

		function updateUser(data) {
			return $http.put('http://localhost:8082/api/v.1.0/user', data);
		}

		function updatePupil(data) {
			return $http.put('http://localhost:8082/api/v.1.0/pupils', data);
		}

		function deletePupilById(id) {
			return $http.delete('http://localhost:8082/api/v.1.0/pupils/' + id);
		}

		function createPupil(data) {
			return $http.post('http://localhost:8082/api/v.1.0/pupils', data);
		}

		function returnBook(bookId, pupilId) {
			return $http.put('http://localhost:8082/api/v.1.0/recordCard/' + bookId + '/' + pupilId)
		}

		function getPupilBooks(pupilId) {
			return $http.get('http://localhost:8082/api/v.1.0/pupils/' + pupilId)
		}

		function giveBookToPupil(pupilId, bookId) {
			return $http.post('http://localhost:8082/api/v.1.0/recordCard/' + bookId + '/' + pupilId);
		}

		function getActiveBooks(pupilId, data) {
			return $http.get('http://localhost:8082/api/v.1.0/books/' + pupilId , {
				params: data
			});
		}

		function getPupilsWithSearch(data) {
		    return $http.get('http://localhost:8082/api/v.1.0/pupils', {
		    params: data
		    });
		}

		function updateBook(data) {
			return $http.put('http://localhost:8082/api/v.1.0/books', data);
		}

		function deleteBookById(id) {
			return $http.delete('http://localhost:8082/api/v.1.0/books/' + id);
		}

		function createBook(book) {
			return $http.post('http://localhost:8082/api/v.1.0/books', book);
		}

		function getBooksWithSearch(searchQuery) {
			return $http.get('http://localhost:8082/api/v.1.0/books', {
				params: searchQuery
			});
		}
	}
})();
