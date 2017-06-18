'use strict';

var appModule = angular.module('myApp', [

]);

appModule.controller('appCtrl', ['$window', '$rootScope', '$http', '$location', '$scope', '$timeout', 
	function($window, $rootScope, $http, $location, $scope, $timeout) {

		var vm = this;

		vm.refresh = function(){
			$http.get('/contactlist').then(function(res){
				vm.contactList = res.data;
			});	
		};
		vm.refresh();

		vm.addContact = function(){
			$http.post('/contactlist',vm.contact).then(function(res){
				console.log('add res: ',res);
				vm.refresh();
			})
		};	

		vm.redmoveContact = function(id){
			$http.delete('/contactlist/'+id).then(function(res){
				console.log('delete res: ',res);
				vm.refresh();
			})
		};
		
		vm.editContact = function(id){
			$http.get('/contactlist/'+id).then(function(res){
				console.log('edit res: ',res);
				vm.contact = res.data;
			})
		};
		
		vm.updateContact = function(){
			$http.put('/contactlist/'+vm.contact._id, vm.contact).then(function(res){
				console.log('update res: ',res);
				vm.refresh();
			})
		};

		vm.clearSelect = function(){
			vm.contact = "";
		};
	}
]);